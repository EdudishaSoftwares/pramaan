import { Schema } from 'mongoose';

export interface IResetPasswordTokenSchema {
  user_id: Schema.Types.ObjectId;
  token: string;
  expires_at: Date;
}
