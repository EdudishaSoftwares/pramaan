import PolicyService from '@/services/policy.service';
import { Request, Response } from 'express';

class PolicyController {
  private policyService = new PolicyService();

  /**
   * Handles privilege evaluation.
   * ```
   * POST /api/v1/internal/policy/evaluate
   * ```
   * @param req - HTTP request object containing userId, privilege, and resource details.
   * @param res - HTTP response object used to send the result.
   */
  public evaluatePolicy = async (req: Request, res: Response) => {
    const { userId, privilege, resource } = req.body;

    const hasAccess = await this.policyService.evaluateUserPrivilege(userId, privilege, resource);
    return res.sendformat({ hasAccess });
  };
}

export default PolicyController;
