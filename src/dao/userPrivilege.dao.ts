import UserPrivilegeModel from '@/models/userPrivilege.model';
import UserModel from '@/models/userProfile.model';

class UserPrivilegeDAO {
  /**
   * Fetches all privileges assigned to a specific user for a given privilege type.
   * @param userId - The ID of the user.
   * @param privilege - The privilege to fetch.
   */
  public async getUserPrivileges(userId: string, privilege: string) {
    console.log('===================================');
    console.log(userId, privilege);
    console.log('===================================');
    return await UserPrivilegeModel.find({
      user: userId,
      privilege,
      $or: [
        { start_time: { $lte: new Date() }, end_time: { $gte: new Date() } },
        { start_time: { $lte: new Date() }, end_time: null },
        { start_time: null, end_time: null },
      ],
    }).lean();
  }

  /**
   * Checks if a user has a specific role.
   * @param userId - The ID of the user.
   * @param role - The role to check.
   */
  public async userHasRole(userId: string, role: string) {
    const user = await UserModel.findById(userId).populate('role').lean();
    return user?.role.some((r: any) => r.name === role);
  }

  /**
   * Fetches the attributes of a user.
   * @param userId - The ID of the user.
   */
  public async getUserAttributes(userId: string) {
    const user = await UserModel.findById(userId).lean();
    return user?.attributes || {};
  }
}

export default UserPrivilegeDAO;
