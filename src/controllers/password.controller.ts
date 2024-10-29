// Modules
import { Request, Response } from 'express';
// Services
import { PasswordService } from '@/services/password.service';

export class PasswordController {
  private passwordService = new PasswordService();

  public updatePassword = async (req: Request<{}, {}, { current_password: string; new_password: string }>, res: Response) => {
    const { current_password, new_password } = req.body;
    const { _id } = req.actor;

    await this.passwordService.updatePassword(current_password, new_password, _id);

    res.status(200).json({ message: 'Success' });
  };

  public sendUpdatePasswordLink = async (req: Request<{}, {}, { email: string }>, res: Response) => {
    const { email } = req.body;

    await this.passwordService.sendUpdatePasswordLink(email);

    res.status(200).json({ message: 'Success' });
  };
}
