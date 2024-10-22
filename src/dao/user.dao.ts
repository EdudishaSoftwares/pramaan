import { UserModel } from '@/models/userProfile.model';
import { IUserSchema } from '@/interfaces/user.interface';
import { UserIdentifier } from '@/constants/enum';

class UserDAO {
  public async findByIdentifier(key: UserIdentifier, value: string): Promise<IUserSchema | null> {
    const query: Record<string, string> = {};
    query[key] = value;
    return UserModel.findOne(query);
  }

  public async createUser(userData: IUserSchema): Promise<IUserSchema> {
    const user = new UserModel(userData);
    return user.save();
  }

  public async updateUserLastActive(userId: string, lastActive: Date): Promise<void> {
    await UserModel.updateOne({ _id: userId }, { last_active: lastActive });
  }
}

export default UserDAO;
