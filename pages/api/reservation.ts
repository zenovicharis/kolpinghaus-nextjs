import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { sendEmail } from "../../lib/email";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Only POST requests allowed" });
    }

    const { captcha, ...data } = req.body;

    if (!captcha) {
      return res.status(400).json({ message: "Captcha token is required" });
    }

    // Verify reCAPTCHA
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`;

    const recaptchaRes = await axios.post(verificationUrl);

    if (!recaptchaRes.data.success || recaptchaRes.data.score < 0.5) {
      return res.status(400).json({ message: "Captcha verification failed" });
    }

    await sendEmail({ type: 'reservation', data });

    res.status(200).json({ message: "Successfully Sent Email" });
  } catch (e) {
    console.error("Server error:", e);
    res.status(500).json({
      message: "Error while trying to send email",
    });
  }
}
