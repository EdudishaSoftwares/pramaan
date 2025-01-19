import PrivilegeModel from '@/models/privilege.model';

class PrivilegeDAO {
  /**
   * Fetches all Privilege .
   * @param privilege - The privilege to fetch policies for.
   */
  public getPrivilege = async (privilege: string) => {
    const result = await PrivilegeModel.findOne({ name: privilege });
    return result?._id;
  };
}

export default PrivilegeDAO;
