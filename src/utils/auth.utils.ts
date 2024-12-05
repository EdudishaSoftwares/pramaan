// Modules
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { randomInt } from 'crypto';

/**
 * Hashes a password using bcrypt.
 * @param {string} password - The password to hash.
 * @returns {string} The hashed password.
 */
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, randomInt(1, 10));
};

/**
 * Compares a plain password with a hashed password using bcrypt.
 * @param {string} password - The plain password to compare.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @returns {boolean} A boolean indicating whether the passwords match.
 */
export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

/**
 * Generates a new session token using UUID.
 * @returns {string} A new UUID string.
 */
export const generateSessionToken = (): string => {
  return uuidv4();
};

/**
 * The function generates a strong one-time password (OTP) with 6 digits.
 * @returns {number} The function `generateStrongOTP` is returning a randomly generated strong one-time password
 * (OTP) as a number.
 */
export const generateStrongOTP = (): number => {
  const otp: number = randomInt(100000, 1000000);
  return otp;
};

/**
 * Generates a unique 7-digit number for user_id.
 * @returns {string} A 7-digit unique number as a string.
 */
export const generateUniqueUserId = (): string => {
  const number = randomInt(1000000, 10000000).toString();
  const isPattern = /^(\d)\1{6}$/.test(number);
  return isPattern ? generateUniqueUserId() : number;
};

/**
 * Generate reset password link to send in email.
 * @param {string} dns
 * @param {string} resetPasswordToken
 * @returns {string} reset password link
 */
export const generateResetPasswordLink = (dns: string, resetPasswordToken: string): string => {
  return `https://${dns}/reset-password?token=${resetPasswordToken}`;
};
