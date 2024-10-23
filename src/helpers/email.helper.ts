import nodemailer from 'nodemailer';
import { email } from '@/config';

class EmailHelper {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email.user,
      pass: email.pass,
    },
  });

  public async sendOtpEmail(to: string, otp: string) {
    return await this.transporter.sendMail({
      from: email.user,
      to,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
    });
  }
}

export default EmailHelper;
