import PolicyDAO from '@/dao/policy.dao';
import PrivilegeDAO from '@/dao/privilege.dao';
import UserPrivilegeDAO from '@/dao/userPrivilege.dao';

class PolicyService {
  private userPrivilegeDAO = new UserPrivilegeDAO();
  private policyDAO = new PolicyDAO();
  private privilegeDAO = new PrivilegeDAO();

  /**
   * Evaluates whether a user has a specific privilege on a given resource.
   * @param userId - The ID of the user requesting access.
   * @param privilege - The privilege being evaluated (e.g., 'can_mark_attendance').
   * @param resource - The resource being accessed (e.g., { class_id: 'class_1' }).
   * @returns Boolean indicating whether the user has access.
   */
  public evaluateUserPrivilege = async (userId: string, privilege: string, resource?: Record<string, string>): Promise<boolean> => {
    if (!userId || !privilege) {
      console.log('===================================');
      console.log('No UserId or Privilage');
      console.log('===================================');
      return false;
    }

    const privilageId = await this.privilegeDAO.getPrivilege(privilege);

    console.log('Phase 1: Check user-specific privileges');
    const userPrivileges = await this.userPrivilegeDAO.getUserPrivileges(userId, privilageId);

    for (const userPrivilege of userPrivileges) {
      if (
        !resource ||
        !userPrivilege.resource_conditions ||
        Object.keys(userPrivilege.resource_conditions).every(
          key => resource[key] === (userPrivilege.resource_conditions ? userPrivilege.resource_conditions[key] : undefined),
        )
      ) {
        return true;
      }
    }

    console.log('Phase 2: Check global policies');
    const policies = await this.policyDAO.getPolicies(privilageId);

    for (const policy of policies) {
      const { conditions, resource_conditions } = policy;

      if (conditions.role && !(await this.userPrivilegeDAO.userHasRole(userId, conditions.role))) continue;

      const userAttributes = await this.userPrivilegeDAO.getUserAttributes(userId);

      const attributeConditionsMet = Object.keys(conditions)
        .filter(key => key.startsWith('attributes.'))
        .every(key => userAttributes[key.split('.')[1]] === conditions[key]);

      if (!attributeConditionsMet) continue;

      if (!resource || !resource_conditions || Object.keys(resource_conditions).every(key => resource[key] === resource_conditions[key])) {
        return true;
      }
    }
    console.log('===================================');
    console.log('No match is found, Access is denied');
    console.log('===================================');
    return false;
  };
}

export default PolicyService;
