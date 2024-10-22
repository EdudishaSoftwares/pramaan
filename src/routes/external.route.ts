// Modules
import { Router } from 'express';
// Controllers
import AuthenticateController from '@/controllers/authenticate.controller';
// Interfaces
import { Routes } from '@/interfaces/routes.interface';
// Middlewares
import ValidatorMiddleware from '@/middlewares/validator.middleware';
// Validators
import * as authenticateControllerValidators from '@/controllers/validators/authenticate.controller.validation';
// Utils
import { asyncWrapper } from '@/utils/util';

class ExternalRoute implements Routes {
  public path = '/api/v1/platform';
  public router = Router();

  // Middlewares
  private validatorMiddleware = new ValidatorMiddleware();
  // Controllers
  public authenticateController = new AuthenticateController();

  constructor() {
    this.initializeAuthRoutes(`${this.path}/auth`);
  }

  private initializeAuthRoutes(prefix: string) {
    //API FOR USER SIGNUP
    this.router.post(`${prefix}/signup`, asyncWrapper(this.authenticateController.userSignup));

    //API FOR USER LOGIN
    this.router.post(
      `${prefix}/login`,
      this.validatorMiddleware.validateRequestBody(authenticateControllerValidators.authenticateControllerBodyParser),
      asyncWrapper(this.authenticateController.userLogin),
    );

    this.router.post(
      `${prefix}/send-otp`,
      this.validatorMiddleware.validateRequestBody(authenticateControllerValidators.sendOtpBodyParser),
      asyncWrapper(this.authenticateController.sendOtp),
    );
  }
}

export default ExternalRoute;
