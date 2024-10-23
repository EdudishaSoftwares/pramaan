// Modules
import { Router } from 'express';
// Controllers
import AuthenticateController from '@/controllers/authenticate.controller';
// Interfaces
import { Routes } from '@/interfaces/routes.interface';
// Middlewares
import ValidatorMiddleware from '@/middlewares/validator.middleware';
import SessionMiddleware from '@/middlewares/session.middleware';
// Validators
import * as authenticateControllerValidators from '@/controllers/validators/authenticate.controller.validation';
// Utils
import { asyncWrapper } from '@/utils/util';

class ExternalRoute implements Routes {
  public path = '/api/v1/platform';
  public router = Router();

  // Middlewares
  private validatorMiddleware = new ValidatorMiddleware();
  private sessionMiddleware = new SessionMiddleware();
  // Controllers
  private authenticateController = new AuthenticateController();

  constructor() {
    this.initializeAuthRoutes(`${this.path}/auth`);
  }

  private initializeAuthRoutes(prefix: string) {
    //API FOR USER SIGNUP
    this.router.post(`${prefix}/signup`, this.sessionMiddleware.validate, asyncWrapper(this.authenticateController.userSignup));

    //API FOR USER LOGIN
    this.router.post(
      `${prefix}/login`,
      this.validatorMiddleware.validateRequestBody(authenticateControllerValidators.authenticateControllerBodyParser),
      asyncWrapper(this.authenticateController.userLogin),
    );

    //API FOR SEND/RESEND OTP
    this.router.post(
      `${prefix}/send-otp`,
      this.validatorMiddleware.validateRequestBody(authenticateControllerValidators.sendOtpBodyParser),
      asyncWrapper(this.authenticateController.sendOtp),
    );

    //API FOR VERIFYING OTP
    this.router.post(
      `${prefix}/verify-otp`,
      this.validatorMiddleware.validateRequestBody(authenticateControllerValidators.verifyOtpBodyParser),
      asyncWrapper(this.authenticateController.verifyOtp),
    );

    //API FOR LOGGING OUT USER
    this.router.post(`${prefix}/logout`, asyncWrapper(this.authenticateController.logout));
  }
}

export default ExternalRoute;
