// Modules
import { Request, Response } from 'express';
// Services
import PasswordService from '@/services/password.service';
import { resetPasswordRequestBody, sendForgotPasswordLinkRequestBody, updatePasswordRequestBody } from './typings/password.controller';

export class PasswordController {
  private passwordService = new PasswordService();

  /**
   * Update user password
   * - Called from client dashboard (on clicking on update password cta)
   * ```
   * PUT: /api/v1/platform/password/update
   * ```
   * @param req - The HTTP request object containing the user's password details.
   * @param res - The HTTP response object used to send the response back to the client.
   */
  public updatePassword = async (req: Request<{}, {}, updatePasswordRequestBody>, res: Response) => {
    const { current_password, new_password } = req.body;
    const { _id } = req.actor;

    await this.passwordService.updatePassword(current_password, new_password, _id);

    return res.sendformat({ message: 'Success' });
  };

  /**
   * Used to send mail containing Forgot password link
   * - Called from client dashboard (on clicking on forgot password CTA)
   * - Http Call: Calls pathshala for fetching school details
   * ```
   * POST: /api/v1/platform/password/forgot
   * ```
   * @param req - The HTTP request object containing the user's email details.
   * @param res - The HTTP response object used to send the response back to the client.
   */
  public sendForgotPasswordLink = async (req: Request<{}, {}, sendForgotPasswordLinkRequestBody>, res: Response) => {
    const { email } = req.body;
    const domain = req.header('host');

    await this.passwordService.sendForgotPasswordLink(email, domain);

    return res.sendformat({ message: 'Success' });
  };

  /**
   * Used to reset password
   * - Called from client application after filling the forgot password details.
   * - Http Call: Calls pathshala for fetching school details
   * ```
   * POST: /api/v1/platform/password/forgot
   * ```
   * @param req - The HTTP request object containing the user's login details.
   * @param res - The HTTP response object used to send the response back to the client.
   */
  public resetPassword = async (req: Request<{}, {}, resetPasswordRequestBody>, res: Response) => {
    const { token, new_password } = req.body;

    await this.passwordService.resetPassword(token, new_password);

    return res.sendformat({ message: 'Success' });
  };
}
