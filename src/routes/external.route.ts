// Modules
import { Router } from 'express';
// Controllers
import AuthenticateController from '@/controllers/authenticate.controller';
import SchoolController from '@/controllers/school.controller';
// Interfaces
import { Routes } from '@/interfaces/routes.interface';
// Middlewares
import ValidatorMiddleware from '@/middlewares/validator.middleware';
import SessionMiddleware from '@/middlewares/session.middleware';
// Validators
import {
  userSignupBodyParser,
  authenticateControllerBodyParser,
  sendOtpBodyParser,
  verifyOtpBodyParser,
} from '@/controllers/validators/authenticate.controller.validation';
import { createSchoolSchema } from '@/controllers/validators/school.controller.validation';
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
  private schoolController = new SchoolController();

  constructor() {
    this.initializeAuthRoutes(`${this.path}/auth`);
    this.initializeSchoolRoutes(`${this.path}/school`);
    this.initializeUserRoutes(`${this.path}/user`);
  }

  private initializeUserRoutes (prefix: string) {
    // POST
    this.router.post(`${prefix}/`, this.sessionMiddleware.validate, asyncWrapper(this.authenticateController.initialUser));
  }

  private initializeAuthRoutes(prefix: string) {
    //API FOR USER SIGNUP
    this.router.post(
      `${prefix}/signup`,
      this.sessionMiddleware.validate,
      this.validatorMiddleware.validateRequestBody(userSignupBodyParser),
      asyncWrapper(this.authenticateController.userSignup),
    );

    //API FOR USER LOGIN
    this.router.post(
      `${prefix}/login`,
      this.validatorMiddleware.validateRequestBody(authenticateControllerBodyParser),
      asyncWrapper(this.authenticateController.userLogin),
    );

    //API FOR SEND/RESEND OTP
    this.router.post(
      `${prefix}/send-otp`,
      this.validatorMiddleware.validateRequestBody(sendOtpBodyParser),
      asyncWrapper(this.authenticateController.sendOtp),
    );

    //API FOR VERIFYING OTP
    this.router.post(
      `${prefix}/verify-otp`,
      this.validatorMiddleware.validateRequestBody(verifyOtpBodyParser),
      asyncWrapper(this.authenticateController.verifyOtp),
    );

    //API FOR LOGGING OUT USER
    this.router.post(`${prefix}/logout`, asyncWrapper(this.authenticateController.logout));
  }
  private initializeSchoolRoutes(prefix: string) {
    //API FOR CREATING SCHOOLS
    //TODO: NEED TO MOVE THIS TO OTHER SERVICE
    this.router.post(
      `${prefix}/create`,
      this.validatorMiddleware.validateRequestBody(createSchoolSchema),
      asyncWrapper(this.schoolController.createSchool),
    );
  }
}

export default ExternalRoute;
