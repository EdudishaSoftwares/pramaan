import AuthenticateController from '@/controllers/authenticate.controller';
import PolicyController from '@/controllers/policy.controller';
import { Routes } from '@/interfaces/routes.interface';
import { asyncWrapper } from '@/utils/util';
import { Router } from 'express';

class InternalRoute implements Routes {
  public path = '/api/v1/internal';
  public router = Router();

  private authenticateController = new AuthenticateController();
  private policyController = new PolicyController();

  constructor() {
    this.initializeAuthRoutes(`${this.path}/auth`);
    this.initializePolicyRoutes(`${this.path}/policy`);
  }

  private initializeAuthRoutes(prefix: string) {
    //INTERNAL API FOR SESSION VALIDATION. USED IN MIDDLEWARES
    this.router.get(`${prefix}/validate-session`, asyncWrapper(this.authenticateController.validateSession));
  }

  private initializePolicyRoutes(prefix: string) {
    this.router.post(`${prefix}/evaluate`, asyncWrapper(this.policyController.evaluatePolicy));
  }
}

export default InternalRoute;
