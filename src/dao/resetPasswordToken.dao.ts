// Modules
import moment from 'moment';
// Model
import ResetPasswordTokenModel from '@/models/resetPasswordToken';
// Typings
import { IAddTokenToDb } from '@/typings/resetPasswordToken';

export class ResetPasswordTokenDao {
  // Model
  private resetPasswordTokenModel = ResetPasswordTokenModel;

  /**
   * Add new reset token in DB.
   * @param {IAddTokenToDb} resetTokenData
   */
  public addPasswordResetToken = async (resetTokenData: IAddTokenToDb) => {
    this.resetPasswordTokenModel.create(resetTokenData);
  };

  /**
   * Get active (hashed) token of a user by user ID.
   * @param {string} userId
   */
  public getActiveTokenByUserId = async (userId: string) => {
    return this.resetPasswordTokenModel.findOne({ user_id: userId, expires_at: { $gt: moment().toDate() } });
  };
}
