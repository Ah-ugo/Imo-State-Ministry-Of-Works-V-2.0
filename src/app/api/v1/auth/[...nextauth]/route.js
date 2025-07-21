/** @format */

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

/**
 * @swagger
 * /api/v1/auth/google:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Initiate Google OAuth login
 *     security: []
 *     responses:
 *       302:
 *         description: Redirects to Google OAuth login page
 * /api/v1/auth/google/callback:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Handle Google OAuth callback
 *     security: []
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: '1'
 *                     username:
 *                       type: string
 *                       example: johndoe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *       400:
 *         description: Authentication failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: OAuth authentication failed
 */
const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        await dbConnect();
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          await User.create({
            username: user.email.split('@')[0],
            email: user.email,
            oauthProvider: account.provider,
            oauthId: account.providerAccountId,
          });
        } else if (
          existingUser.oauthProvider !== account.provider ||
          existingUser.oauthId !== account.providerAccountId
        ) {
          existingUser.oauthProvider = account.provider;
          existingUser.oauthId = account.providerAccountId;
          await existingUser.save();
        }

        return true;
      } catch (error) {
        console.error('OAuth signIn error:', error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        const customToken = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );
        token.customToken = customToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.customToken = token.customToken;
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to API endpoint to return JSON with token
      return `${baseUrl}/api/v1/auth/google/callback`;
    },
  },
  pages: {
    signIn: '/api/v1/auth/google',
  },
});

// Custom handler for Google callback to return JSON
export async function GET(request, { params }) {
  const { searchParams } = new URL(request.url);
  const handlerResponse = await handler(request, { params });

  if (request.nextUrl.pathname.includes('/api/v1/auth/google/callback')) {
    try {
      await dbConnect();
      const email =
        searchParams.get('email') || handlerResponse?.session?.user?.email;
      if (!email) {
        return NextResponse.json(
          { success: false, error: 'No email provided' },
          { status: 400 }
        );
      }

      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json(
          { success: false, error: 'User not found' },
          { status: 400 }
        );
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return NextResponse.json({
        success: true,
        token,
        data: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      console.error('Google callback error:', error);
      return NextResponse.json(
        { success: false, error: 'OAuth authentication failed' },
        { status: 400 }
      );
    }
  }

  return handlerResponse;
}

export { handler as POST };
