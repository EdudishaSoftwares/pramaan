import { Router } from 'express';
import { Routes } from '@/interfaces/routes.interface';


//Constants
import { ROLES } from '@/constants/common.constants';

//utils

class ExternalRoute implements Routes {
  public path = '/api/v1/platform';
  public router = Router();

  constructor() {
    this.initializePageRoutes(`${this.path}/page`);
  }

  // eslint-disable-next-line max-lines-per-function
  private initializePageRoutes(prefix: string) {

  }
}

export default ExternalRoute;
