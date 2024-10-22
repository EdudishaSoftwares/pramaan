import { NextFunction, Response, Request } from 'express';
//services
import AuthenticateService from '@/services/authenticate.service';
import { authenticateControllerBody } from './typings/authenticate.controller';

class AuthenticateController {
  public authenticateService = new AuthenticateService();

  public addNewUser = async (req: Request, res: Response) => {
    return {};
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
   * - DAOs: OtpDAO to create and manage OTP entries associated with users.
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
}

export default AuthenticateController;
