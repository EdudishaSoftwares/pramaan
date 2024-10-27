// Typings
import { CreateUserInDb, UserSignupData } from '@/typings/authenticate';
// Utils
import { generateUniqueUserId } from '@/utils/auth.utils';

export class AuthenticateFormatter {
  /**
   * Formats data for creating new user in DB.
   * @param {UserSignupData} userSignupData
   * @returns
   */
  public formatNewUserData = (userSignupData: UserSignupData): CreateUserInDb => {
    return {
      user_id: generateUniqueUserId(),
      first_name: userSignupData.firstName,
      last_name: userSignupData.lastName,
      profile_picture: userSignupData.profilePicture,
      password: userSignupData.password,
      email: userSignupData.email,
      phone_number: userSignupData.email,
      school_ids: userSignupData.schoolIds,
      role: userSignupData.role,
      user_type: userSignupData.userType,
    };
  };
}
