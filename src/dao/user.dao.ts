// Models
import UserModel from '@/models/userProfile.model';
// Constants
import { UserIdentifier } from '@/constants/enum';
// Interfaces
import { IUserSchema } from '@/interfaces/user.interface';
// Typngs
import { CreateUserInDb } from '@/typings/authenticate';

class UserDAO {
  // Model
  private userModel = UserModel;

  /**
   * Find user in DB by given identifier type.
   * @param {UserIdentifier} key
   * @param {string} value
   * @returns
   */
  public async findByIdentifier(key: UserIdentifier, value: string): Promise<IUserSchema | null> {
    const query: Record<string, string> = {};
    query[key] = value;
    return this.userModel.findOne(query);
  }

  /**
   * Create new user in DB.
   * @param {CreateUserInDb} userData
   * @returns
   */
  public async createUser(userData: CreateUserInDb): Promise<IUserSchema> {
    return this.userModel.create(userData);
  }

  /**
   * Update user's last active time.
   * @param {string} userId
   * @param {Date} lastActive
   */
  public async updateUserLastActive(userId: string, lastActive: Date): Promise<void> {
    await UserModel.updateOne({ _id: userId }, { last_active: lastActive });
  }
}

export default UserDAO;
