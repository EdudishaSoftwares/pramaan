import { z } from 'zod';

export const authenticateControllerBodyParser = z.object({
  identifier: z
    .string({ required_error: 'Identifier is required!' })
    .min(5, 'Identifier must be at least 5 characters long')
    .max(35, 'Identifier must be at most 35 characters long'),
  password: z
    .string({ required_error: 'Password is required!' })
    .min(5, 'Password must be at least 5 characters long')
    .max(20, 'Password must be at most 20 characters long'),
});

export const sendOtpBodyParser = z.object({
  email: z
    .string({ required_error: 'Email is required!' })
    .email()
    .min(5, 'Email must be at least 5 characters long')
    .max(35, 'Email must be at most 25 characters long'),
});

export const userSignupBodyParser = z.object({
  first_name: z.string({ required_error: 'First name is required!' }).regex(nameRegex, 'Invalid first name!'),
  last_name: z.string({ required_error: 'Last name is required!' }).regex(nameRegex, 'Invalid last name!'),
  profile_picture: z.string().optional(),
  password: z
    .string({ required_error: 'Password is required!' })
    .min(5, 'Password must be at least 5 characters long')
    .max(20, 'Password must be at most 20 characters long'),

  email: z
    .string({ required_error: 'Email is required!' })
    .email()
    .min(5, 'Email must be at least 5 characters long')
    .max(35, 'Email must be at most 25 characters long'),
  phone_number: z.string().regex(phoneNumberRegex, 'Invalid phone number!').optional(),
  school_ids: z.string().array().min(1),
});

export const verifyOtpBodyParser = z.object({
  email: z
    .string()
    .email()
    .min(5, 'Email must be at least 5 characters long')
    .max(35, 'Email must be at most 25 characters long')
    .nonempty('Email is required'),
  otp: z
    .string()
    .refine(val => /^\d+$/.test(val), {
      message: 'OTP must be a Numeric',
    })
    .refine(val => val.length === 6, {
      message: 'OTP must be exactly 6 digits long',
    }),
});
