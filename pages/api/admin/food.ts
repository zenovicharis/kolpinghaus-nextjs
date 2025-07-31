import { NextApiRequest, NextApiResponse } from 'next';
import * as jose from 'jose';
import { deleteFood, addFood, updateFood, getFood } from '../../../lib/queries/food';

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
      const food = await getFood();
      res.status(200).json(food);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Food ID is required' });
    }

    try {
      await deleteFood(id);
      res.status(200).json({ message: 'Food item deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    const { name, price, info, subtypeId } = req.body;

    if (!name || !price || !subtypeId) {
      return res.status(400).json({ message: 'Name, price and category are required' });
    }

    try {
      await addFood({ name, price, info, subtypeId });
      res.status(201).json({ message: 'Food item created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'PUT') {
    const { id, name, price, info, subtypeId } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Food ID is required' });
    }

    try {
      await updateFood(id, { name, price, info, subtypeId });
      res.status(200).json({ message: 'Food item updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
