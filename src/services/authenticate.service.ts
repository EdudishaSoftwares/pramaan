import UserDAO from '@/dao/user.dao';
import SessionDAO from '@/dao/session.dao';
import R from 'ramda';
import { hashPassword, comparePasswords, generateSessionToken } from '@/utils/auth.utils';
import { UserIdentifier } from '@/constants/enum';
import { HandledError } from '@/exceptions/HandledError';
class AuthenticateService {
  private userDAO = new UserDAO();
  private sessionDAO = new SessionDAO();

  public addNewUser = async () => {
    // Your method specific logic here
    const hashedPassword = await hashPassword('password');
  };

  /**
   * Authenticates a user based on the provided identifier (either phone number, email, or user ID)
   * and password. If the authentication is successful, a new session is created and a session token
   * is returned along with the user's details (excluding the password).
   * @param identifier - A string that can be a 10-digit phone number, an email address, or a user ID
   * used to identify the user.
   * @param password - A string representing the user's password that needs to be validated.
   * @returns An object containing the session token, expiration date, and user details
   * (excluding the password), or an error message if authentication fails.
   */
  public async userLogin(identifier: string, password: string) {
    let user;

    if (/^\d{10}$/.test(identifier)) {
      user = await this.userDAO.findByIdentifier(UserIdentifier.PhoneNumber, identifier);
    } else if (/\S+@\S+\.\S+/.test(identifier)) {
      user = await this.userDAO.findByIdentifier(UserIdentifier.Email, identifier);
    } else {
      user = await this.userDAO.findByIdentifier(UserIdentifier.UserId, identifier);
    }

    if (!user || !(await comparePasswords(password, user.password))) {
      throw new HandledError('Incorrect email or password', 401);
    }

    const sessionToken = generateSessionToken();
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);

    // Create a new session in the database
    await this.sessionDAO.createSession(sessionToken, user._id, expiresAt);

    return {
      sessionToken,
      expiresAt,
      user: R.omit(['password'], user),
    };
  }
}

export default AuthenticateService;
