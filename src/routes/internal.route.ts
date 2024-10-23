import AuthenticateController from '@/controllers/authenticate.controller';
import { Routes } from '@/interfaces/routes.interface';
import { asyncWrapper } from '@/utils/util';
import { Router } from 'express';

class InternalRoute implements Routes {
  public path = '/api/v1/internal';
  public router = Router();

  private authenticateController = new AuthenticateController();

  constructor() {
    this.initializeAuthRoutes(`${this.path}/auth`);
  }

  private initializeAuthRoutes(prefix: string) {
    //INTERNAL API FOR SESSION VALIDATION. USED IN MIDDLEWARES
    this.router.get(`${prefix}/validate-session`, asyncWrapper(this.authenticateController.validateSession));
  }
}

export default InternalRoute;
