import { NextFunction, Request, Response } from 'express';
import { connect } from 'mongoose';

//Config
import { service_name } from '@config';

//DB conncection
import { MONGO_CONNECTION_INSTANCES } from '@/databases';
const dbConnection = MONGO_CONNECTION_INSTANCES['demo'];

class IndexController {
  public index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!dbConnection || dbConnection.readyState !== 1) {
        return res.status(500).json({ message: 'Cannot connect to db' });
      }
      return res.status(200).json({ service: service_name });
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
