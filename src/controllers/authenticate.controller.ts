import { NextFunction, Response, Request } from 'express';
//services
import DemoService from '@/services/authenticate.service';

class DemoController {
  public demoService = new DemoService();

  public addNewUser = async (req: Request, res: Response, next: NextFunction) => {

  }
}

export default DemoController;
