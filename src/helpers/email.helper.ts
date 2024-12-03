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

  public async sendBookDemoRequestEmail(to: string, prefferedDate: Date) {
    return await this.transporter.sendMail({
      from: email.user,
      to,
      subject: 'Free Demo Booked',
      text: `Your free demo is booked at ${prefferedDate}. Please find your Google Meet link.`,
    });
  }
}

export default EmailHelper;
