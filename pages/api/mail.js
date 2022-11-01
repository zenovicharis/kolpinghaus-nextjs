// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { SMTPClient } from "emailjs";

export default async function handler(req, res) {
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
    client.send({
      text: `${message}`,
      from: email,
      to: process.env.RECIEVER,
      subject: `Message from ${name}`,
    });
    res.status(200).json({ message: "Succesfully Sent Email" });
  } catch (e) {
    res.status(500).json({
      error: e,
      message: "Error while trying to Sent Email",
    });
  }
}
