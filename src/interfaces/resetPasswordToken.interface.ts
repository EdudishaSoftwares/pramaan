import { Schema } from 'mongoose';

export interface IResetPasswordTokenSchema {
  user_id: Schema.Types.ObjectId | string;
  token: string;
  expires_at: Date;
  email_attempts: number;
  blocked_until: Date;
}
