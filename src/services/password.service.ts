// Constants
import { UserIdentifier } from '@/constants/enum';
// Dao
import { ResetPasswordTokenDao } from '@/dao/resetPasswordToken.dao';
import UserDAO from '@/dao/user.dao';
// Exceptions
import { HandledError } from '@/exceptions/HandledError';
// Formatters
import { ResetPasswordTokenFormatter } from '@/formatters/resetPasswordToken.formatter';
// Helpers
import EmailHelper from '@/helpers/email.helper';
// Utils
import { comparePasswords, generateResetPasswordLink, generateSessionToken, hashPassword } from '@/utils/auth.utils';

export class PasswordService {
  // Dao
  private userDao = new UserDAO();
  private resetPasswordTokenDao = new ResetPasswordTokenDao();
  // Formatters
  private resetPasswordTokenFormatter = new ResetPasswordTokenFormatter();
  // Helpers
  private emailHelper = new EmailHelper();

  /**
   * The function `updatePassword` asynchronously updates a user's password after verifying the current
   * password.
   * @param {string} currentPassword - The `currentPassword` parameter is the user's current password
   * that they need to provide in order to verify their identity before updating their password.
   * @param {string} newPassword - The `newPassword` parameter in the `updatePassword` function
   * represents the new password that the user wants to set for their account. This new password will
   * be encrypted before being stored in the database to ensure security and privacy.
   * @param {string} userId - The `userId` parameter in the `updatePassword` function is a string that
   * represents the unique identifier of the user whose password needs to be updated.
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
   * The function `sendUpdatePasswordLink` checks if a user exists, generates a unique token, stores it
   * in the database, and sends a reset password link via email.
   * @param {string} email - The `sendUpdatePasswordLink` function is designed to send a password reset
   * link to a user via email. The function first checks if the user with the provided email exists in
   * the database. If the user does not exist, it will not throw an error but will simply return
   * without taking any further action
   * @returns If the user does not exist or if there is already an active reset password token for the
   * user, the function will return early without performing any further actions. If a new reset
   * password token is successfully generated, stored in the database, and an email with the reset
   * password link is sent to the user, the function will complete without any explicit return value.
   */
  public sendUpdatePasswordLink = async (email: string) => {
    // Check if email exists.
    const user = await this.userDao.findByIdentifier(UserIdentifier.Email, email);

    // DO NOT THROW ERROR if user doesn't exist.
    // Will still show success on client side either way.
    if (!user) {
      return;
    }

    // Check if unexpired token for the user already exists in DB. If yes, return.
    const activeToken = await this.resetPasswordTokenDao.getActiveTokenByUserId(user._id);
    if (activeToken) {
      return;
    }

    // Generate unique token.
    const resetPasswordToken = generateSessionToken();
    const hashedResetPasswordToken = await hashPassword(resetPasswordToken);

    // Store the token in DB.
    const resetPasswordTokenData = this.resetPasswordTokenFormatter.formatNewTokenData(user._id, hashedResetPasswordToken);
    await this.resetPasswordTokenDao.addPasswordResetToken(resetPasswordTokenData);

    // Generate reset password link.
    // TODO: Add logic to add school DNS in reset password link.
    const resetPasswordLink = generateResetPasswordLink('', resetPasswordToken);

    // Send email to user.
    await this.emailHelper.sendUpdatePasswordLink(user.email, resetPasswordLink);
  };
}
