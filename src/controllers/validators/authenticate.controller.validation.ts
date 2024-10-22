import { z } from 'zod';

export const authenticateControllerBodyParser = z.object({
  identifier: z
    .string()
    .min(5, 'Identifier must be at least 5 characters long')
    .max(25, 'Identifier must be at most 25 characters long')
    .nonempty('Identifier is required'),
  password: z
    .string()
    .min(5, 'Password must be at least 5 characters long')
    .max(35, 'Password must be at most 25 characters long')
    .nonempty('Password is required'),
});

export const sendOtpBodyParser = z.object({
  email: z
    .string()
    .email()
    .min(5, 'Email must be at least 5 characters long')
    .max(35, 'Email must be at most 25 characters long')
    .nonempty('Email is required'),
});
