// Constants
import { ROLE, USER_TYPE } from '@/constants/user';

export interface IUserSchema {
  user_id: string;
  first_name: string;
  last_name: string;
  profile_picture?: string;
  password: string;
  email: string;
  role: ROLE;
  user_type: USER_TYPE;
  is_active: boolean;
  phone_number?: string;
  last_active: Date | null;
  is_deactivated: boolean;
}
