import { Router } from 'express';
import { Routes } from '@/interfaces/routes.interface';
//utils

class ExternalRoute implements Routes {
  public path = '/api/v1/platform';
  public router = Router();

  constructor() {
    this.initializePageRoutes(`${this.path}/signup`);
  }

  private initializePageRoutes(prefix: string) {

  }
}

export default ExternalRoute;
