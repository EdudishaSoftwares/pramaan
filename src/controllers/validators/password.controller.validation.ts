import { passwordRegex } from '@/constants/common.constants';
import { z } from 'zod';

class PasswordValidators {
  public resetPasswordSchema = z
    .object({
      token: z.string(),
      new_password: z.string().regex(new RegExp(passwordRegex), { message: 'Enter Valid Password' }),
      confirm_password: z.string({ required_error: 'Confirm New Password is Required' }),
    })
    .refine(data => data.new_password === data.confirm_password, {
      message: 'Passwords do not match',
      path: ['confirm_password'],
    });

  public updatePasswordSchema = z
    .object({
      current_password: z.string().regex(new RegExp(passwordRegex), { message: 'Enter Valid Current Password' }),
      new_password: z.string().regex(new RegExp(passwordRegex), { message: 'Enter Valid New Password' }),
      confirm_password: z.string({ required_error: 'Confirm New Password is Required' }),
    })
    .refine(data => data.new_password === data.confirm_password, {
      message: 'Passwords do not match',
      path: ['confirm_password'],
    });

  public sendForgotPasswordLinkSchema = z.object({
    email: z.string({ required_error: 'Email is required' }).email('Invalid Email'),
  });
}

export default new PasswordValidators();
