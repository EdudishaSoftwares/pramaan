// Typings
import { HandledError } from '@/exceptions/HandledError';
import { UserSignupData } from '@/typings/authenticate';
// Utils
import { isValidEmail, isValidName, isValidPhoneNumber } from '@/utils/util';

export class AuthenticateHelper {
  /**
   * Validate user signup data.
   * @param {UserSignupData} userSignupData
   */
  public validateUserSignupData = (userSignupData: UserSignupData) => {
    const { firstName, lastName, email, phoneNumber } = userSignupData;

    if (!isValidName(firstName)) {
      throw new HandledError('Invalid first name!');
    }
    if (!isValidName(lastName)) {
      throw new HandledError('Invalid first name!');
    }
    if (!isValidEmail(email)) {
      throw new HandledError('Invalid email!');
    }
    if (phoneNumber && !isValidPhoneNumber(phoneNumber)) {
      throw new HandledError('Invalid phone number!');
    }
  };

  public generateUnqiueUserId = () => {};
}
