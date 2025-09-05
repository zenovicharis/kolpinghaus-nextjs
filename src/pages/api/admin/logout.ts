import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default function logoutHandler(req: NextApiRequest, res: NextApiResponse) {
  // Clear the token cookie using the same attributes used when setting it.
  const cookie = serialize("token", "", {
    path: "/",
    httpOnly: true,
    maxAge: 0,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  res.setHeader("Set-Cookie", cookie);
  res.redirect("/admin/login");
}
