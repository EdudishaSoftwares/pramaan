// Models
import UserModel from '@/models/userProfile.model';
// Constants
import { UserIdentifier } from '@/constants/enum';
// Interfaces
import { IUserSchema } from '@/interfaces/user.interface';
// Typngs
import { CreateUserInDb } from '@/typings/authenticate';
import { ObjectId } from 'mongoose';

class UserDAO {
  // Model
  private userModel = UserModel;

  /**
   * Get a single user data by mongo ID.
   * @param {string} userId - _id stored in mongo document
   * @param {(keyof IUserSchema)[]} [fields = []] -  Fields to be fetched from the user document.
   * @returns
   */
  public getUserDataByUserId = async <T extends keyof IUserSchema>(userId: string, fields: T[] = []): Promise<Pick<IUserSchema, T> | null> => {
    return this.userModel.findOne({ _id: userId, is_active: true }).select(fields).lean();
  };

  /**
   * Find user in DB by given identifier type.
   * @param {UserIdentifier} key
   * @param {string} value
   * @param {(keyof IUserSchema)[]} [fields = []] -  Fields to be fetched from the user document.
   * @returns
   */
  public findByIdentifier = async <T extends keyof IUserSchema>(
    key: UserIdentifier,
    value: string,
    fields: T[] = [],
  ): Promise<Pick<IUserSchema, T> | null> => {
    const query: Record<string, string> = {};
    query[key] = value;

    return this.userModel
      .findOne({ ...query, is_active: true })
      .select(fields)
      .lean();
  };

  /**
   * Create new user in DB.
   * @param {CreateUserInDb} userData
   * @returns
   */
  public createUser = async (userData: CreateUserInDb): Promise<IUserSchema> => {
    return this.userModel.create(userData);
  };

  /**
   * Update user's last active time.
   * @param {string} userId
   * @param {Date} lastActive
   */
  public updateUserLastActive = async (userId: string, lastActive: Date): Promise<void> => {
    await this.userModel.updateOne({ _id: userId, is_active: true }, { last_active: lastActive });
  };

  /**
   * Update user's password.
   * @param {string} userId
   * @param {string} password
   */
  public updateUserPassword = async (userId: string | ObjectId, password: string): Promise<void> => {
    await this.userModel.updateOne({ _id: userId, is_active: true }, { password });
  };
}

export default UserDAO;
