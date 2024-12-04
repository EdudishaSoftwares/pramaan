// Modules
import { z } from 'zod';
// Constants
import { nameRegex } from '@/constants/common.constants';

// Zod schema for booking demo request
export const bookDemoRequestBodyParser = z.object({
  first_name: z.string({ required_error: 'First name is required!' }).regex(nameRegex, 'Invalid first name!'),
  last_name: z.string({ required_error: 'Last name is required!' }).regex(nameRegex, 'Invalid last name!'),
  email: z
    .string({ required_error: 'Email is required!' })
    .email()
    .min(5, 'Email must be at least 5 characters long')
    .max(35, 'Email must be at most 35 characters long'),
  message: z.string().optional(),
  preffered_date: z
    .string({ required_error: 'Preffered date is required!' })
    .transform(val => new Date(val)) // Convert to Date object
    .pipe(
      z
        .date()
        .min(new Date(), 'Enter valid date and time')
        .max(new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000), 'Enter valid date and time'),
    ),
});
