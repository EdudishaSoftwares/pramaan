// Interfaces
import { IResetPasswordTokenSchema } from '@/interfaces/resetPasswordToken.interface';

export type IAddTokenToDb = Pick<IResetPasswordTokenSchema, 'token' | 'expires_at'> & {
  user_id: string;
};
