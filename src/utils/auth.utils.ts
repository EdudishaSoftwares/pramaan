import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { randomInt } from 'crypto';

/**
 * Hashes a password using bcrypt.
 * @param password - The password to hash.
 * @returns The hashed password.
 */
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, randomInt(1, 10));
};

/**
 * Compares a plain password with a hashed password using bcrypt.
 * @param password - The plain password to compare.
 * @param hashedPassword - The hashed password to compare against.
 * @returns A boolean indicating whether the passwords match.
 */
export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

/**
 * Generates a new session token using UUID.
 * @returns A new UUID string.
 */
export const generateSessionToken = (): string => {
  return uuidv4();
};

export const generateStrongOTP = (): number => {
  const otp: number = randomInt(100000, 1000000);
  return otp;
};
