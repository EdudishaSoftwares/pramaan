// Modules
import { z } from 'zod';
// Constants
import { nameRegex, passwordRegex, phoneNumberRegex } from '@/constants/common.constants';

class AuthenticationValidators {
  public authenticateControllerBodySchema = z.object({
    identifier: z
      .string({ required_error: 'Identifier is required!' })
      .min(5, 'Identifier must be at least 5 characters long')
      .max(35, 'Identifier must be at most 35 characters long'),
    password: z.string().regex(new RegExp(passwordRegex), { message: 'Enter Valid Password' }),
  });

  public sendOtpBodySchema = z.object({
    email: z
      .string({ required_error: 'Email is required!' })
      .email()
      .min(5, 'Email must be at least 5 characters long')
      .max(35, 'Email must be at most 5 characters long'),
  });

  public userSignupBodySchema = z.object({
    first_name: z.string({ required_error: 'First name is required!' }).regex(nameRegex, 'Invalid first name!'),
    last_name: z.string({ required_error: 'Last name is required!' }).regex(nameRegex, 'Invalid last name!'),
    profile_picture: z.string().optional(),
    password: z.string().regex(new RegExp(passwordRegex), { message: 'Enter Valid Password' }),
    email: z.string({ required_error: 'Email is required!' }).email(),
    phone_number: z.string().regex(phoneNumberRegex, 'Invalid phone number!').optional(),
    school_ids: z.string().array().min(1),
  });

  public verifyOtpBodySchema = z.object({
    email: z.string({ required_error: 'Email is required' }).email(`Email Must be valid`),
    otp: z
      .string()
      .refine(val => /^\d+$/.test(val), {
        message: 'OTP must be a Numeric',
      })
      .refine(val => val.length === 6, {
        message: 'OTP must be exactly 6 digits long',
      }),
  });
}

export default new AuthenticationValidators();
