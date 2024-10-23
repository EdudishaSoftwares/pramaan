// Constants
import { ROLE, USER_TYPE } from '@/constants/user';
import { ObjectId } from 'mongoose';

export interface IUserSchema {
  _id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  profile_picture?: string;
  password: string;
  email: string;
  role: ROLE;
  user_type: USER_TYPE;
  school_ids?: string[];
  is_active: boolean;
  phone_number?: string;
  last_active: Date | null;
  is_deactivated: boolean;
}

export interface IOtpSchema {
  user: string;
  user_id: string;
  email: string;
  otp: string;
  expiresAt: Date;
  isUsed: boolean;
  isExpired: boolean;
}

export interface ISessionSchema {
  sessionToken: string;
  userId: string | ObjectId;
  expiresAt: Date;
}
