// Modules
import { Router } from 'express';
// Controllers
import AuthenticateController from '@/controllers/authenticate.controller';
import PasswordController from '@/controllers/password.controller';
// Interfaces
import { Routes } from '@/interfaces/routes.interface';
// Middlewares
import ValidatorMiddleware from '@/middlewares/validator.middleware';
import SessionMiddleware from '@/middlewares/session.middleware';
// Validators
import PasswordValidators from '@/controllers/validators/password.controller.validation';
import AuthenticationValidators from '@/controllers/validators/authenticate.controller.validation';
// Utils
import { asyncWrapper } from '@/utils/util';
import PolicyMiddleware from '@/middlewares/policy.middleware';

class ExternalRoute implements Routes {
  public path = '/api/v1/platform';
  public router = Router();

  // Middlewares
  private validatorMiddleware = new ValidatorMiddleware();
  private sessionMiddleware = new SessionMiddleware();
  private policyMiddleware = new PolicyMiddleware();
  // Controllers
  private authenticateController = new AuthenticateController();
  private passwordController = new PasswordController();
  private authenticationValidators = AuthenticationValidators;
  private passwordValidators = PasswordValidators;

  constructor() {
    this.initializeAuthRoutes(`${this.path}/auth`);
    this.initializePasswordRoutes(`${this.path}/password`);
    this.initializeUserRoutes(`${this.path}/user`);
  }

  private initializeUserRoutes(prefix: string) {
    // POST
    this.router.post(`${prefix}/`, this.sessionMiddleware.validate, asyncWrapper(this.authenticateController.initialUser));
  }

  private initializeAuthRoutes(prefix: string) {
    //API FOR USER SIGNUP
    this.router.post(
      `${prefix}/signup`,
      this.sessionMiddleware.validate,
      this.policyMiddleware.evaluateUserPrivilege,
      this.validatorMiddleware.validateRequestBody(this.authenticationValidators.userSignupBodySchema),
      asyncWrapper(this.authenticateController.userSignup),
    );

    //API FOR USER LOGIN
    this.router.post(
      `${prefix}/login`,
      this.validatorMiddleware.validateRequestBody(this.authenticationValidators.authenticateControllerBodySchema),
      asyncWrapper(this.authenticateController.userLogin),
    );

    //API FOR SEND/RESEND OTP
    this.router.post(
      `${prefix}/send-otp`,
      this.validatorMiddleware.validateRequestBody(this.authenticationValidators.sendOtpBodySchema),
      asyncWrapper(this.authenticateController.sendOtp),
    );

    //API FOR VERIFYING OTP
    this.router.post(
      `${prefix}/verify-otp`,
      this.validatorMiddleware.validateRequestBody(this.authenticationValidators.verifyOtpBodySchema),
      asyncWrapper(this.authenticateController.verifyOtp),
    );

    //API FOR LOGGING OUT USER
    this.router.post(`${prefix}/logout`, asyncWrapper(this.authenticateController.logout));
  }

  private initializePasswordRoutes(prefix: string) {
    this.router.put(
      `${prefix}/update`,
      this.validatorMiddleware.validateRequestBody(this.passwordValidators.updatePasswordSchema),
      asyncWrapper(this.passwordController.updatePassword),
    );
    this.router.post(
      `${prefix}/forgot`,
      this.validatorMiddleware.validateRequestBody(this.passwordValidators.sendForgotPasswordLinkSchema),
      asyncWrapper(this.passwordController.sendForgotPasswordLink),
    );
    this.router.post(
      `${prefix}/reset`,
      this.validatorMiddleware.validateRequestBody(this.passwordValidators.resetPasswordSchema),
      asyncWrapper(this.passwordController.resetPassword),
    );
  }
}

export default ExternalRoute;
