// Modules
import R from 'ramda';
import { Types } from 'mongoose';
// Constants
import { UserIdentifier } from '@/constants/enum';
// Dao
import { UserDAO } from '@/dao/user.dao';
import { SessionDAO } from '@/dao/session.dao';
import OtpDAO from '@/dao/otp.dao';
// Exceptions
import { HandledError } from '@/exceptions/HandledError';
// Helpers
import { AuthenticateHelper } from '@/helpers/authenticate.helper';
import emailHelper from '@/helpers/email.helper';
// Formatters
import { AuthenticateFormatter } from '@/formatters/authenticate.formatter';
// Typings
import { UserSignupData } from '@/typings/authenticate';
// Utils
import { hashPassword, comparePasswords, generateSessionToken } from '@/utils/auth.utils';

import { getUserIdentifierType } from '@/utils/util';
class AuthenticateService {
  // Dao
  private userDAO = new UserDAO();
  private sessionDAO = new SessionDAO();
  private otpDAO = new OtpDAO();
  // Helpers
  private authenticateHelper = new AuthenticateHelper();
  // Formatters
  private authenticateFormatter = new AuthenticateFormatter();

  /**
   * Validate user data and create new user entry in DB.
   * @param {UserSignupData} userSignupData
   */
  public userSignup = async (userSignupData: UserSignupData) => {
    // Validate user data before proceeding.
    this.authenticateHelper.validateUserSignupData(userSignupData);

    // Encrypt password
    const hashedPassword = await hashPassword(userSignupData.password);
    userSignupData = { ...userSignupData, password: hashedPassword };

    // Format user data.
    const formattedUserSignupData = this.authenticateFormatter.formatNewUserData(userSignupData);

    // Create user entry in DB.
    await this.userDAO.createUser(formattedUserSignupData);
  };

  /**
   * Authenticates a user based on the provided identifier (either phone number, email, or user ID)
   * and password. If the authentication is successful, a new session is created and a session token
   * is returned along with the user's details (excluding the password).
   * @param {string} identifier - A string that can be a 10-digit phone number, an email address, or a user ID
   * used to identify the user.
   * @param {string} password - A string representing the user's password that needs to be validated.
   * @returns An object containing the session token, expiration date, and user details
   * (excluding the password), or an error message if authentication fails.
   */
  public async userLogin(identifier: string, password: string) {
    // Find user based on identifier (phone_number, email, user_id)
    const user = await this.userDAO.findByIdentifier(getUserIdentifierType(identifier), identifier);

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

  /**
   * The function first checks if the user exists. If an existing valid OTP is found, it is resent.
   * If no valid OTP exists, a new OTP is generated, saved in the database, and sent to the user's email.
   * @param {string} email - A string representing the user's email address to which the OTP will be sent.
   * @returns An object containing a message indicating the status of the OTP request and the OTP itself if sent.
   * @throws HandledError if the user is not found or if other issues occur during OTP generation or sending.
   */
  public async sendOtp(email: string) {
    const user = await this.userDAO.findByIdentifier(UserIdentifier.Email, email);

    if (!user) {
      throw new HandledError('User not found', 401);
    }

    // Check for an existing valid OTP
    const existingOtp = await this.otpDAO.findValidOtp(user._id);
    if (existingOtp) {
      await emailHelper.sendOtpEmail(user.email, existingOtp.otp);
      return { message: 'OTP resent to your email', otp: existingOtp.otp };
    }

    // Generate a new OTP if no valid OTP exists
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    // Save the new OTP in the database
    await this.otpDAO.createOtp({
      user: user._id,
      user_id: user.user_id,
      email: user.email,
      otp,
      expiresAt,
    });

    await emailHelper.sendOtpEmail(user.email, otp);
    return { message: 'OTP sent to your email', otp };
  }
}

export default AuthenticateService;
