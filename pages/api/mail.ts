import { NextApiRequest, NextApiResponse } from "next";
import { SMTPClient } from "emailjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      res.status(405).send({ message: "Only POST requests allowed" });
      return;
    }
    const { email, name, message } = req.body;

    const client = new SMTPClient({
      user: process.env.EMAIL,
      password: process.env.PASSWORD,
      host: "smtp.gmail.com",
      ssl: true,
    });

    // The 'emailjs' library may not have TypeScript types.
    // If you encounter type errors, you might need to install @types/emailjs
    // or create a custom declaration file.
    client.send(
      {
        "reply-to": email,
        text: `${message}`,
        from: email,
        to: process.env.RECIEVER!,
        subject: `Message from ${name}`,
      },
      (err: any, msg: any) => {
        if (err) {
          return res.status(500).json({
            error: err,
            message: "Error while trying to send email",
          });
        }
        res.status(200).json({ message: "Successfully Sent Email" });
      }
    );
  } catch (e) {
    res.status(500).json({
      error: e,
      message: "Error while trying to send email",
    });
  }
}
