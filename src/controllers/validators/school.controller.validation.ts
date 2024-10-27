import { z } from 'zod';

// Zod schema for school address
const addressSchema = z.object({
  line1: z.string({ required_error: 'Address line 1 is required.' }),
  line2: z.string().optional(),
  city: z.string({ required_error: 'City is required.' }),
  state: z.string({ required_error: 'State is required.' }),
  postalCode: z.string().regex(/^\d{6}$/, 'Postal code must be a 6-digit number.'),
});

// Zod schema for contact information
const contactInfoSchema = z.object({
  phone: z.array(z.string().regex(/^[0-9+ -]+$/, 'Phone numbers must be valid.')).min(1, 'At least one contact phone number is required.'),
  email: z.array(z.string().email('Each contact email must be valid.')).min(1, 'At least one contact email is required.'),
});

// Zod schema for the entire school object
export const createSchoolSchema = z.object({
  name: z.string({ required_error: 'School name is required.' }),
  address: addressSchema,
  boardAffiliation: z.enum(['CBSE', 'ICSE', 'State', 'International']),
  boardAffiliationNumber: z.string({ required_error: 'Affiliation Number is required.' }),
  establishmentYear: z
    .number()
    .min(1800, 'Establishment year must be a valid year.')
    .max(new Date().getFullYear(), 'Establishment year cannot be in the future.'),
  contactInfo: contactInfoSchema,
  principalName: z.string({ required_error: 'Principal name is required.' }),
});
