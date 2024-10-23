// Modules
import { Response, Request } from 'express';
// Services
import AuthenticateService from '@/services/authenticate.service';
// Typings
import { authenticateControllerBody } from './typings/authenticate.controller';
import { UserSignupBody, UserSignupHeaders } from '@/typings/authenticate';

class AuthenticateController {
  // Services
  private authenticateService = new AuthenticateService();

  /**
   * Handles user singup requests.
   * - Called From: Client application for user signup.
   * - DAOs: UserDAO to create new user.
   * ```
   * POST /api/v1/platform/auth/signup
   * ```
   * @param req - The HTTP request object containing the user's login details.
   * @param res - The HTTP response object used to send the response back to the client.
   */
  public userSignup = async (req: Request<{}, {}, UserSignupBody>, res: Response) => {
    const {
      first_name: firstName,
      last_name: lastName,
      profile_picture: profilePicture,
      password,
      email,
      phone_number: phoneNumber,
      school_ids: schoolIds,
    } = req.body;
    const user = req.actor;
    const { wm_role: role, wm_usertype: userType } = req.headers as UserSignupHeaders;

    const userSignupData = { firstName, lastName, profilePicture, password, email, phoneNumber, role, userType, schoolIds };

    await this.authenticateService.userSignup(userSignupData);

    res.status(200).json({ message: 'Success' });
  };

  /**
   * Handles user login requests.
   * - Called From: Client application for user authentication.
   * - DAOs: UserDAO to retrieve user details based on identifier,
   *      Sessions Dao to create and store sessions
   * - External Libraries: bcrypt for password hashing and comparison,
   *      uuid for generating session tokens.
   * ```
   * POST /api/v1/platform/auth/login
   * ```
   * @param req - The HTTP request object containing the user's login details.
   * @param res - The HTTP response object used to send the response back to the client.
   */
  public userLogin = async (req: Request<{}, {}, authenticateControllerBody>, res: Response) => {
    const { identifier, password } = req.body;

    const loginResult = await this.authenticateService.userLogin(identifier, password);

    const { sessionToken, expiresAt, user } = loginResult;
    const maxAge = expiresAt ? expiresAt.getTime() - Date.now() : undefined;

    //SETTING COOKIES AND HEADERS REQUIRED FOR OTHER APIS (FE SHOULD  NESSARY SEND THIS AS HEADERS IN EVERY API CALLS)
    res.cookie('session_token', sessionToken, { maxAge });
    res.setHeader('wm_usertype', user?.user_type || 'user');
    res.setHeader('wm_role', user?.role || 'student');
    return res.status(200).json(user);
  };

  /**
   * Handles sending OTP requests for user authentication.
   * - Called From: Client application to initiate the OTP-based authentication process.
   * - DAOs: UserDAO to retrieve user details based on email
   *         OtpDAO to create and manage OTP entries associated with users.
   * - External Libraries: Nodemailer for sending OTP emails.
   * ```
   * POST /api/v1/platform/auth/send-otp
   * ```
   * @param req - The HTTP request object containing the user's email address.
   * @param res - The HTTP response object used to send the response back to the client.
   */
  public sendOtp = async (req: Request, res: Response) => {
    const { email } = req.body;
    const result = await this.authenticateService.sendOtp(email);
    return res.status(200).json(result);
  };

  /**
   * Handles session validation requests.
   * - Called From: Other services to verify a session and retrieve user details.
   * - DAOs: SessionDAO to retrieve session details,
   *         UserDAO to retrieve user details.
   * - External Libraries: None (session-token is passed via headers).
   * ```
   * GET /api/v1/internal/auth/validate-session
   * ```
   * @param req - The HTTP request object containing the session token in the headers.
   * @param res - The HTTP response object used to send the session and user data back to the caller.
   */
  public validateSession = async (req: Request, res: Response) => {
    const sessionToken = (req.headers['session-token'] as string) || req.cookies['session_token'];

    const validationResult = await this.authenticateService.validateSession(sessionToken);

    const { session, user } = validationResult;

    return res.status(200).json({
      session,
      user,
    });
  };

  /**
   * Controller for verifying OTP.
   * - Called From: Client application during the OTP verification process.
   * - DAOs: UserDAO to retrieve user based on identifier and OTP,
   *         OTP DAO to validate the OTP.
   * ```
   * POST /api/v1/platform/auth/verify-otp
   * ```
   * @param req - The HTTP request object containing the identifier and OTP.
   * @param res - The HTTP response object used to send the response back to the client.
   */
  public verifyOtp = async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    const user = await this.authenticateService.verifyOtp(email, otp);
    return res.status(200).json({ message: 'OTP verified successfully', user });
  };

  /**
   * Controller for logging out the user.
   * - Called From: Client application to log out the user.
   * - DAOs: Sessions DAO to delete the session based on token.
   * ```
   * POST /api/v1/platform/auth/logout
   * ```
   * @param req - The HTTP request object containing the session token.
   * @param res - The HTTP response object used to send the response back to the client.
   */
  public logout = async (req: Request, res: Response) => {
    const sessionToken = req.cookies['session_token'] || req.headers['session-token'];
    await this.authenticateService.logout(sessionToken);
    res.clearCookie('session_token');
    return res.status(200).json({ message: 'Logged out successfully' });
  };
}

export default AuthenticateController;
