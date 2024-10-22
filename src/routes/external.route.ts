import { Router } from 'express';
import { Routes } from '@/interfaces/routes.interface';
import { asyncWrapper } from '@/utils/util';
import ValidatorMiddleware from '@/middlewares/validator.middleware';
import * as authenticateControllerValidators from '@/controllers/validators/authenticate.controller.validation';

//CONTROLLERS
import AuthenticateController from '@/controllers/authenticate.controller';

class ExternalRoute implements Routes {
  public path = '/api/v1/platform';
  public router = Router();
  public authenticateController = new AuthenticateController();
  private validatorMiddleware = new ValidatorMiddleware();

  constructor() {
    this.initializeAuthRoutes(`${this.path}/auth`);
  }

  private initializeAuthRoutes(prefix: string) {
    //API FOR USER SIGNUP
    this.router.post(`${prefix}/signup`, asyncWrapper(this.authenticateController.addNewUser));

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
