// Constants
import { UserIdentifier } from '@/constants/enum';
// Dao
import ResetPasswordTokenDao from '@/dao/resetPasswordToken.dao';
import UserDAO from '@/dao/user.dao';
// Exceptions
import { HandledError } from '@/exceptions/HandledError';
// Formatters
import { ResetPasswordTokenFormatter } from '@/formatters/resetPasswordToken.formatter';
// Helpers
import EmailHelper from '@/helpers/email.helper';
// Utils
import { comparePasswords, generateResetPasswordLink, generateSessionToken, hashPassword } from '@/utils/auth.utils';
// Https
import PathshalaInternal from '@/https/pathshala.http';
import moment from 'moment';
import { email } from '@/config';

class PasswordService {
  // Dao
  private userDao = new UserDAO();
  private resetPasswordTokenDao = new ResetPasswordTokenDao();
  // Formatters
  private resetPasswordTokenFormatter = new ResetPasswordTokenFormatter();
  // Helpers
  private emailHelper = new EmailHelper();
  // Https
  private pathshalaInternal = new PathshalaInternal();

  private maxAllowedEmails = email.max_allowed_emails;

  /**
   * Update User Password.
   * - Checks if the user exists .
   * - Check if current password is valid.
   * - Update new hashed password to db.
   * @param {string} currentPassword - User's current password.
   * @param {string} newPassword - Requested new password.
   * @param {string} userId - Requester UserId.
   */
  public updatePassword = async (currentPassword: string, newPassword: string, userId: string) => {
    // Verify current password matches with the password stored in DB.
    const user = await this.userDao.getUserDataByUserId(userId, ['password']);
    if (!user) {
      throw new HandledError('User not found', 401);
    }

    const currentPasswordVerified = await comparePasswords(currentPassword, user.password);
    if (!currentPasswordVerified) {
      throw new HandledError('Incorrect current password!');
    }

    // ... Current password verified

    // Encrypt new password.
    const hashedPassword = await hashPassword(newPassword);

    // Replace old password with the new one.
    await this.userDao.updateUserPassword(userId, hashedPassword);
  };

  /**
   * Sends a forgot password link to the user's email.
   * - Checks if the user exists and belongs to the requesting domain.
   * - Limits the user to 3 email attempts; blocks for 10 minutes after 3 failed attempts.
   * - Does not create a new token on retries unless the token has expired.
   * @param {string} email - User's email address.
   * @param {string} domain - Requesting domain.
   */
  public sendForgotPasswordLink = async (email: string, domain?: string) => {
    if (!domain) {
      throw new HandledError('Unauthorized', 401);
    }

    // Fetch user by email
    const user = await this.userDao.findByIdentifier(UserIdentifier.Email, email);
    if (!user) {
      return;
    }

    // Verify user's school association with the domain
    const schoolDetails = await this.pathshalaInternal.getSchoolDetailByDomainName(domain);
    // If user from different school try to access different school link
    if (!user.school_ids?.includes(schoolDetails._id)) {
      throw new HandledError('Unauthorized request: Invalid school', 403);
    }

    // Fetch existing token and validate attempts/block status
    const existingToken = await this.resetPasswordTokenDao.getActiveTokenByUserId(user._id);

    // Check if user is blocked
    if (existingToken?.blocked_until && moment().isBefore(existingToken.blocked_until)) {
      const remainingMinutes = moment(existingToken.blocked_until).diff(moment(), 'minutes');
      throw new HandledError(`You are blocked. Please try again after ${remainingMinutes} minute(s).`, 429);
    }

    // Check and handle token expiration
    if (existingToken && existingToken.expires_at < moment().toDate()) {
      // Token expired but count this as a failed attempt
      await this.resetPasswordTokenDao.updateAttempts(user._id, (existingToken.email_attempts || 0) + 1);
    }

    // Increment email attempts (reset if token expired or doesn't exist)
    let emailAttempts = existingToken?.email_attempts || 0;
    emailAttempts++;

    if (emailAttempts > this.maxAllowedEmails) {
      // Block the user for 10 minutes after exceeding allowed attempts
      const blockUntil = moment().add(10, 'minutes').toDate();
      await this.resetPasswordTokenDao.updateAttemptsAndBlock(user._id, emailAttempts, blockUntil);
      throw new HandledError('Too many attempts. You are blocked for 10 minutes.', 429);
    }

    // If token exists and is valid, resend the reset password link
    if (existingToken && existingToken.expires_at > moment().toDate()) {
      const resetPasswordLink = generateResetPasswordLink(schoolDetails.domain, existingToken.token);
      await this.emailHelper.sendUpdatePasswordLink(user.email, resetPasswordLink);
      // Extend the coupon validity for next 10 minutes
      const tokenExpiresAt = moment().add(10, 'minutes').toDate();
      await this.resetPasswordTokenDao.updateAttemptsAndExpiredAt(user._id, emailAttempts, tokenExpiresAt);
      return;
    }

    // If no valid token, create a new one
    const hashedResetPasswordToken = await hashPassword(generateSessionToken());
    const resetPasswordTokenData = this.resetPasswordTokenFormatter.formatNewTokenData(user._id, hashedResetPasswordToken, emailAttempts);

    await this.resetPasswordTokenDao.addPasswordResetToken(resetPasswordTokenData);

    // Send reset password link
    const resetPasswordLink = generateResetPasswordLink(schoolDetails.domain, hashedResetPasswordToken);
    this.emailHelper.sendUpdatePasswordLink(user.email, resetPasswordLink);
  };

  /**
   * Verifies the token, checks expiration, and updates the user's password.
   * @param {string} token - Reset password token
   * @param {string} newPassword - New password for the user
   */
  public resetPassword = async (token: string, newPassword: string) => {
    // Validate the token
    const tokenData = await this.resetPasswordTokenDao.findByToken(token);

    if (!tokenData) {
      throw new HandledError('Invalid or expired token', 400);
    }

    if (moment().toDate() > tokenData.expires_at) {
      throw new HandledError('Token has expired', 400);
    }

    // Update the user's password
    const hashedPassword = await hashPassword(newPassword);
    await this.userDao.updateUserPassword(tokenData.user_id, hashedPassword);

    // Delete the reset token to prevent reuse
    await this.resetPasswordTokenDao.deleteToken(tokenData.user_id);
  };
}

export default PasswordService;
