// Modules
import moment from 'moment';

export class ResetPasswordTokenFormatter {
  /**
   * Format new reset password token data.
   * @param {string} userId
   * @param {string} hashedToken
   * @returns
   */
  public formatNewTokenData = (userId: string, hashedToken: string) => {
    return {
      user_id: userId,
      token: hashedToken,
      expires_at: moment().add(10, 'minutes').toDate(),
    };
  };
}
