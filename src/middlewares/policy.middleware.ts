import PolicyService from '@/services/policy.service';
import { Request, Response, NextFunction } from 'express';
//Services

class PolicyMiddleware {
  private policyService = new PolicyService();

  /**
   * Evaluate the privilages.
   * @param req - The HTTP request object containing body.
   * @param res - The HTTP response object used to send the response back to the client.
   * @param next - Calls the next middleware or the controller function if validation succeeds.
   */
  public evaluateUserPrivilege = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.actor._id;

      const hasAccess = await this.policyService.evaluateUserPrivilege(userId, 'create_user');

      if (!hasAccess) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      next();
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message || 'Internal server error' });
    }
  };
}

export default PolicyMiddleware;
