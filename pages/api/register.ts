import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

const sleep = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, 350);
  });

interface RegisterRequestBody {
  email?: string;
  captcha?: string;
}

interface CaptchaValidationResponse {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  "error-codes"?: string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req;
  const { email, captcha }: RegisterRequestBody = body;

  if (method === "POST") {
    if (!email || !captcha) {
      return res.status(422).json({
        message: "Unprocessable request, please provide the required fields",
      });
    }

    try {
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${captcha}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          },
          method: "POST",
        }
      );
      const captchaValidation: CaptchaValidationResponse =
        (await response.json()) as CaptchaValidationResponse;

      if (captchaValidation.success) {
        await sleep();
        return res.status(200).send("OK");
      }

      return res.status(422).json({
        message: "Unprocessable request, Invalid captcha code",
      });
    } catch (error) {
      console.log(error);
      return res.status(422).json({ message: "Something went wrong" });
    }
  }

  return res.status(404).send("Not found");
}
