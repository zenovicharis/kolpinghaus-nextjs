import { NextApiRequest, NextApiResponse } from 'next';
import * as jose from 'jose';
import { deleteSlide, addSlide, updateSlide, getSlides, getSlideById } from '../../../lib/queries/slides';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
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
      const slides = await getSlides();
      const presignedSlides = await Promise.all(
        slides.map(async (slide) => {
          const presignedUrl = await minioClient.presignedGetObject(BUCKET_NAME, slide.url, 15 * 60); // 15 minutes
          return { ...slide, url: presignedUrl };
        })
      );
      res.status(200).json(presignedSlides);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: 'Slide ID is required' });
    }

    try {
      const slide = await getSlideById(Number(id));
      if (slide && slide.url) {
        let objectName = slide.url;
        try {
          const url = new URL(slide.url);
          objectName = url.pathname.split('/').slice(2).join('/');
        } catch (e) {
        }
        if (objectName) {
          await minioClient.removeObject(BUCKET_NAME, objectName);
        }
      }
      await deleteSlide(Number(id));
      res.status(200).json({ message: 'Slide deleted successfully' });
    } catch (error) {
      console.error('Failed to delete slide', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { fields, files } = await parseForm(req);
      const { title, subtitle } = fields;
      const image = files.image;

      if (!image) {
        return res.status(400).json({ message: 'Image is required' });
      }

      const file = Array.isArray(image) ? image[0] : image;
        const objectName = `slider/${Date.now()}-${file.originalFilename}`;
        const fileStream = fs.createReadStream(file.filepath);
        await minioClient.putObject(BUCKET_NAME, objectName, fileStream, file.size);
        await addSlide({
          title: title?.[0] || '',
          subtitle: subtitle?.[0] || '',
          url: objectName,
        });

      res.status(201).json({ message: 'Slide created successfully' });
    } catch (error) {
      console.error('Failed to add slide. Full error:', JSON.stringify(error, null, 2));
      res.status(500).json({ message: 'Failed to add slide' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { fields, files } = await parseForm(req);
      const { id, title, subtitle } = fields;
      const image = files.image;

      if (!id) {
        return res.status(400).json({ message: 'Slide ID is required' });
      }

      let imageUrl;
      if (image) {
        const slide = await getSlideById(Number(id));
        if (slide && slide.url) {
            let objectName = slide.url;
            try {
                const url = new URL(slide.url);
                objectName = url.pathname.split('/').slice(2).join('/');
            } catch (e) {
            }
            if (objectName) {
                await minioClient.removeObject(BUCKET_NAME, objectName);
            }
        }
        const file = Array.isArray(image) ? image[0] : image;
        const objectName = `slider/${Date.now()}-${file.originalFilename}`;
        const fileStream = fs.createReadStream(file.filepath);
        await minioClient.putObject(BUCKET_NAME, objectName, fileStream, file.size);
        imageUrl = objectName;
      }

      await updateSlide(Number(id), {
        title: title?.[0] || '',
        subtitle: subtitle?.[0] || '',
        url: imageUrl,
      });

      res.status(200).json({ message: 'Slide updated successfully' });
    } catch (error) {
      console.error('Failed to update slide. Full error:', JSON.stringify(error, null, 2));
      res.status(500).json({ message: 'Failed to update slide' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
