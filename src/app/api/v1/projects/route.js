/** @format */

import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';

/**
 * @swagger
 * /api/v1/projects:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Get all projects
 *     security: []
 *     responses:
 *       200:
 *         description: List of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: '1'
 *                       title:
 *                         type: string
 *                         example: Road Construction
 *                       description:
 *                         type: string
 *                         example: Highway expansion project
 *                       imageUrl:
 *                         type: string
 *                         example: https://example.com/image.jpg
 *                       cloudinaryId:
 *                         type: string
 *                         example: cloudinary_id_123
 *                       status:
 *                         type: string
 *                         enum: [planned, in-progress, completed]
 *                         example: planned
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-07-20T18:58:00Z
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-07-20T18:58:00Z
 *       400:
 *         description: Error fetching projects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *   post:
 *     tags:
 *       - Projects
 *     summary: Create a new project with image upload
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Project data and image file
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Road Construction
 *               description:
 *                 type: string
 *                 example: Highway expansion project
 *               status:
 *                 type: string
 *                 enum: [planned, in-progress, completed]
 *                 example: planned
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The project image to upload
 *             required:
 *               - title
 *               - description
 *               - image
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: '1'
 *                     title:
 *                       type: string
 *                       example: Road Construction
 *                     description:
 *                       type: string
 *                       example: Highway expansion project
 *                     imageUrl:
 *                       type: string
 *                       example: https://example.com/image.jpg
 *                     cloudinaryId:
 *                       type: string
 *                       example: cloudinary_id_123
 *                     status:
 *                       type: string
 *                       enum: [planned, in-progress, completed]
 *                       example: planned
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-07-20T18:58:00Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-07-20T18:58:00Z
 *       400:
 *         description: Error creating project
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
 *                   example: Image upload failed
 *       401:
 *         description: Unauthorized
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
 *                   example: Invalid or missing token
 */
export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find({});
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function POST(request) {
  try {
    // Verify JWT token
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Missing or invalid token' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }

    await dbConnect();

    const formData = await request.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const status = formData.get('status') || 'planned';
    const image = formData.get('image');

    if (!title || !description || !image) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const uploadResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.json();
      throw new Error(errorData.message || 'Image upload failed');
    }

    const { imageUrl, cloudinaryId } = await uploadResponse.json();

    const project = await Project.create({
      title,
      description,
      status,
      imageUrl,
      cloudinaryId,
    });

    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
