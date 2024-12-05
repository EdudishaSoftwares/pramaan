// Modules
import { z } from 'zod';
// Constants
import { nameRegex, phoneNumberRegex } from '@/constants/common.constants';

// Zod schema for booking demo request
export const bookDemoRequestBodyParser = z.object({
  first_name: z.string({ required_error: 'First name is required!' }).regex(nameRegex, 'Invalid first name!'),
  last_name: z.string({ required_error: 'Last name is required!' }).regex(nameRegex, 'Invalid last name!'),
  email: z
    .string({ required_error: 'Email is required!' })
    .email()
    .min(5, 'Email must be at least 5 characters long')
    .max(35, 'Email must be at most 35 characters long'),
  phone_number: z.string({ required_error: 'Last name is required!' }).regex(phoneNumberRegex, 'Invalid phone number!'),
  message: z.string().optional(),
});
