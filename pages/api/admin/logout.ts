import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default function logoutHandler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Set-Cookie', serialize('token', '', {
    maxAge: -1,
    path: '/',
    httpOnly: true,
  }));
  res.redirect('/admin/login');
}
