/** @format */

import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

/**
 * @swagger
 * /api/v1/upload:
 *   post:
 *     tags:
 *       - Upload
 *     summary: Upload an image to Cloudinary
 *     security: []
 *     requestBody:
 *       description: Image file to upload
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *             required:
 *               - image
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 imageUrl:
 *                   type: string
 *                   example: https://res.cloudinary.com/example/image.jpg
 *                 cloudinaryId:
 *                   type: string
 *                   example: cloudinary_id_123
 *       400:
 *         description: No image file provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: No image uploaded
 *       500:
 *         description: Error uploading image
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Upload failed
 *                 error:
 *                   type: string
 *                   example: Cloudinary upload error
 */
export async function POST(request) {
  try {
    const formData = await request.formData();
    const image = formData.get('image');

    if (!image) {
      return NextResponse.json(
        { success: false, message: 'No image uploaded' },
        { status: 400 }
      );
    }

    const buffer = await image.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: 'auto',
            folder: 'imo-ministry-projects',
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        )
        .end(fileBuffer);
    });

    return NextResponse.json({
      success: true,
      imageUrl: result.secure_url,
      cloudinaryId: result.public_id,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Upload failed',
        error: error.message || 'Cloudinary upload error',
      },
      { status: 500 }
    );
  }
}
