import nodemailer from 'nodemailer';
import { email } from '@/config';
import moment from 'moment';

class EmailHelper {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email.user,
      pass: email.pass,
    },
  });

  public sendOtpEmail = (to: string, otp: string, userName: string) => {
    return this.transporter.sendMail({
      from: email.user,
      to,
      subject: 'Your OTP Code',
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            background-color: #ffffff;
            border-radius: 5px;
            padding: 20px;
            max-width: 600px;
            margin: auto;
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
        }
        .otp-code {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            text-align: center;
            margin: 20px 0;
        }
        .expiry-info {
            font-size: 16px;
            color: #e74c3c; /* Red color for urgency */
            font-weight: bold;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>OTP Verification</h2>
        </div>
        <p>Dear ${userName},</p>
        <p>Your OTP code is:</p>
        <div class="otp-code">${otp}</div>
        <p class="expiry-info">This code will expire in 10 minutes.</p>
        <p>If you did not request this code, please ignore this email.</p>
        <div class="footer">
            <p>Thank you for using our service!</p>
        </div>
    </div>
</body>
</html>
`,
    });
  };

  public sendUpdatePasswordLink = (to: string, resetPasswordLink: string, userName: string) => {
    return this.transporter.sendMail({
      from: email.user,
      to,
      subject: 'Reset Password Link - Expires in 10 minutes.',
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .email-header {
            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
            color: white;
            text-align: center;
            padding: 20px;
        }
        .email-body {
            padding: 30px;
            text-align: center;
        }
        .reset-button {
            display: inline-block;
            background: #2575fc;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
            font-weight: bold;
        }
        .footer {
            background-color: #f4f4f4;
            color: #777;
            text-align: center;
            padding: 10px;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Reset Your Password</h1>
        </div>
        <div class="email-body">
            <p>Hello ${userName},</p>

            <p>We received a request to reset your password. Click the button below to set a new password:</p>
            <a href="${resetPasswordLink}" class="reset-button">Reset Password</a>
            <p>If you did not request a password reset, please ignore this email or contact support if you have any concerns.</p>
            <p>This link will expire in 10 minutes for your security.</p>
        </div>
        <div class="footer">
            © ${moment().year()} Edu-Disha. All rights reserved.
        </div>
    </div>
</body>
</html>`,
    });
  };
}

export default EmailHelper;
