import { Router } from 'express';

class InternalRoute {
  public path = '/api/v1/internal/';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // this.router.get(`${this.path}/demo/:id`, this.demoController.fetchDemoEntityAttributeInternal);
  }
}

export default InternalRoute;
