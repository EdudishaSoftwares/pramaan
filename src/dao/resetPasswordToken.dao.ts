// Modules
import moment from 'moment';
// Model
import ResetPasswordTokenModel from '@/models/resetPasswordToken.model';
// Typings
import { IAddTokenToDb } from '@/typings/resetPasswordToken';
import { IResetPasswordTokenSchema } from '@/interfaces/resetPasswordToken.interface';
import { ObjectId } from 'mongoose';

class ResetPasswordTokenDao {
  // Model
  private resetPasswordTokenModel = ResetPasswordTokenModel;

  /**
   * Add new reset token in DB.
   * @param {IAddTokenToDb} resetTokenData
   */
  public addPasswordResetToken = async (resetTokenData: IAddTokenToDb) => {
    return this.resetPasswordTokenModel.create(resetTokenData);
  };

  /**
   * Get active (hashed) token of a user by user ID.
   * @param {string} userId
   */
  public getActiveTokenByUserId = async (userId: string) => {
    return this.resetPasswordTokenModel.findOne({ user_id: userId, expires_at: { $gt: moment().toDate() } });
  };

  /**
   * Get Token by userId.
   * @param {string} userId
   */
  public getTokenByUserId = async (userId: string): Promise<IResetPasswordTokenSchema | null> => {
    return ResetPasswordTokenModel.findOne({ user_id: userId });
  };

  /**
   * Update Attempts and block user.
   * @param {string} userId
   * @param {number} emailAttempts
   * @param {Date} blockedUntil
   */
  public updateAttemptsAndBlock = async (userId: string, emailAttempts: number, blockedUntil: Date) => {
    return ResetPasswordTokenModel.updateOne({ user_id: userId }, { email_attempts: emailAttempts, blocked_until: blockedUntil });
  };

  /**
   * Update Attempts for Reset Password Token.
   * @param {string} userId
   * @param {number} emailAttempts
   */
  public updateAttempts = async (userId: string, emailAttempts: number) => {
    return ResetPasswordTokenModel.updateOne({ user_id: userId }, { email_attempts: emailAttempts });
  };

  /**
   * Update Attempts and ExpiredAt of Reset Password Token.
   * @param {string} userId
   * @param {number} emailAttempts
   * @param {Date} expiresAt
   */
  public updateAttemptsAndExpiredAt = async (userId: string, emailAttempts: number, expiresAt: Date) => {
    return ResetPasswordTokenModel.updateOne({ user_id: userId }, { email_attempts: emailAttempts, expires_at: expiresAt });
  };

  /**
   * Find Reset Password Token.
   * @param {string} token
   */
  public findByToken = async (token: string): Promise<IResetPasswordTokenSchema | null> => {
    return ResetPasswordTokenModel.findOne({ token });
  };

  /**
   * Delete Reset Password Token.
   * @param {string | ObjectId} userId
   */
  public deleteToken = async (userId: string | ObjectId) => {
    return ResetPasswordTokenModel.deleteOne({ user_id: userId });
  };
}

export default ResetPasswordTokenDao;
