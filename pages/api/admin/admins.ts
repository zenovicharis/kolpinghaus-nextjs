import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/drizzle';
import { admin } from '../../../db/schema';
import { eq } from 'drizzle-orm';
import * as jose from 'jose';
import { deleteAdmin, addAdmin, updateAdmin, getAdmins } from '../../../lib/queries/admins';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    await jose.jwtVerify(token, secret);
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const admins = await getAdmins();
      res.status(200).json(admins);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Admin ID is required' });
    }

    try {
      await deleteAdmin(id);
      res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
      await addAdmin({ username, password });
      res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'PUT') {
    const { id, username, password } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Admin ID is required' });
    }

    try {
      await updateAdmin(id, { username, password });
      res.status(200).json({ message: 'Admin updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
