import nodemailer from 'nodemailer';
import { USER_EMAIL, PASS_EMAIL } from '@/config';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: USER_EMAIL,
    pass: PASS_EMAIL,
  },
});

export const mailOptions = (data) => {
  return {
    from: USER_EMAIL,
    to: data.from,
    subject: data.subject,
    text: data.text,
  };
};