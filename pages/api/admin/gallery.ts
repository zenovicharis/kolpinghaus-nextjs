import { NextApiRequest, NextApiResponse } from 'next';
import * as jose from 'jose';
import { deleteImage, addImage, getImages, getImageById } from '../../../lib/queries/images';
import formidable from 'formidable';
import fs from 'fs';
import { minioClient } from '../../../lib/minio';

export const config = {
  api: {
    bodyParser: false,
  },
};

const BUCKET_NAME = process.env.MINIO_BUCKET_NAME!;

const formidableConfig = {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    filter: ({ mimetype }: { mimetype?: string | null }) => mimetype?.startsWith('image/') || false,
    multiples: true,
  };

async function ensureBucketExists() {
    const exists = await minioClient.bucketExists(BUCKET_NAME);
    if (!exists) {
        await minioClient.makeBucket(BUCKET_NAME);
        console.log(`Bucket ${BUCKET_NAME} created.`);
    }
}

async function parseForm(req: NextApiRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
    return new Promise((resolve, reject) => {
      const form = formidable(formidableConfig);
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
        } else {
          resolve({ fields, files });
        }
      });
    });
  }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    await jose.jwtVerify(token, secret);
    await ensureBucketExists(); // Ensure bucket exists before proceeding
  } catch (error) {
    console.error("Auth or MinIO bucket check failed:", error);
    const statusCode = (error as any).code === 'AccessDenied' ? 403 : 500;
    return res.status(statusCode).json({ message: 'Unauthorized or MinIO error' });
  }

  if (req.method === 'GET') {
    try {
      const images = await getImages();
      const presignedImages = await Promise.all(
        images.map(async (image) => {
          const presignedUrl = await minioClient.presignedGetObject(BUCKET_NAME, image.url, 15 * 60); // 15 minutes
          return { ...image, url: presignedUrl };
        })
      );
      res.status(200).json(presignedImages);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: 'Image ID is required' });
    }

    try {
      const image = await getImageById(Number(id));
      if (image && image.url) {
        // Try to parse as a full URL (old format)
        try {
          const url = new URL(image.url);
          const objectName = url.pathname.split('/').slice(2).join('/');
          if (objectName) {
            await minioClient.removeObject(BUCKET_NAME, objectName);
          }
        } catch (e) {
          // If parsing fails, it's either a new MinIO object name or a local file path
          if (image.url.startsWith('gallery/')) {
            await minioClient.removeObject(BUCKET_NAME, image.url);
          }
          // Note: No local file deletion logic is added as it appears gallery images are only from MinIO.
        }
      }
      await deleteImage(Number(id));
      res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
      console.error('Failed to delete image:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    try {
        const { files } = await parseForm(req);
        const images = files.image;

        if (!images) {
            return res.status(400).json({ message: 'Image is required' });
        }

        for (const image of Array.isArray(images) ? images : [images]) {
            const file = image as formidable.File;
            const objectName = `gallery/${Date.now()}-${file.originalFilename}`;
            const fileStream = fs.createReadStream(file.filepath);
            await minioClient.putObject(BUCKET_NAME, objectName, fileStream, file.size);
            await addImage({
                url: objectName,
            });
        }
        res.status(201).json({ message: 'Image uploaded successfully' });
    } catch (error) {
        console.error('Failed to upload images. Full error:', JSON.stringify(error, null, 2));
        res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
