import { mailOptions, transporter } from "@/utils/nodemailer";
import { USER_EMAIL } from "@/config";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, subject, message } = req.body;
    console.log(email, subject, message);
    if (!email || !subject || !message) {
      return res.status(400).json({ message: "Bad request" });
    }

    try {
      // Send email
      await transporter.sendMail({
        // ...mailOptions({ from: email, subject:subject, text: message }),
        from: email,
        to: USER_EMAIL,
        subject: subject,
        html: message,
      });
      res.status(200).json({ message: "Email sent" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  return res.status(400).json({ message: "Bad request" });
};

export default handler;
