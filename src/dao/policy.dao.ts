import PolicyModel from '@/models/policy.model';

class PolicyDAO {
  /**
   * Fetches all policies related to a specific privilege.
   * @param privilege - The privilege to fetch policies for.
   */
  public getPolicies = async (privilege: string) => {
    return await PolicyModel.find({ privilege }).lean();
  };
}

export default PolicyDAO;
