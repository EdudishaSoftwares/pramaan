// Constants
import { ROLE, USER_TYPE } from '@/constants/user';
// Interfaces
import { IUserSchema } from '@/interfaces/user.interface';
// Typings
import { CamelCaseKeys } from './common';

export type UserSignupBody = Pick<IUserSchema, 'first_name' | 'last_name' | 'profile_picture' | 'password' | 'email' | 'phone_number' | 'school_ids'>;
export type UserSignupHeaders = {
  edu_role: ROLE;
  edu_usertype: USER_TYPE;
};

export type UserSignupData = CamelCaseKeys<UserSignupBody & Pick<IUserSchema, 'role' | 'user_type'>>;
export type CreateUserInDb = UserSignupBody & Pick<IUserSchema, 'role' | 'user_type'>;
