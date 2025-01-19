import UserPrivilegeModel from '@/models/userPrivilege.model';
import UserModel from '@/models/userProfile.model';

class UserPrivilegeDAO {
  /**
   * Fetches all privileges assigned to a specific user for a given privilege type.
   * @param userId - The ID of the user.
   * @param privilege - The privilege to fetch.
   */
  public getUserPrivileges = async (userId: string, privilege: string) => {
    return await UserPrivilegeModel.find({
      user: userId,
      privilege,
      $or: [
        { start_time: { $lte: new Date() }, end_time: { $gte: new Date() } },
        { start_time: { $lte: new Date() }, end_time: null },
        { start_time: null, end_time: null },
      ],
    });
  };

  /**
   * Checks if a user has a specific role.
   * @param userId - The ID of the user.
   * @param role - The role to check.
   */
  public userHasRole = async (userId: string, role: string) => {
    const user = await UserModel.findById(userId).populate('role');
    return user?.role.some((r: any) => r.name === role);
  };

  /**
   * Fetches the attributes of a user.
   * @param userId - The ID of the user.
   */
  public getUserAttributes = async (userId: string) => {
    const user = await UserModel.findById(userId);
    return user?.attributes || {};
  };
}

export default UserPrivilegeDAO;
