import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response, Application } from 'express';
import helmet from 'helmet';
import { set } from 'mongoose';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import config, { port, gcpRoute } from '@config';
import { Routes } from '@/interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
// import { logger } from '@utils/logger';
import * as Sentry from '@sentry/node';
import bodyParser from 'body-parser';
import { NotFoundError } from '@exceptions/NotFoundError';
// import { Logger } from 'winston';

const NODE_ENV = config.NODE_ENV;

class App {
  public app: Application;
  public env: string;
  public port: string | number;
  private routes: Routes[];

  constructor(routes: Routes[]) {
    this.env = NODE_ENV || 'development';
    this.port = port || 3000;
    this.routes = routes;
    this.app = express();

    this.app.enable('trust proxy');
    this.initializeMiddlewares();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.info(`=================================`);
      console.info(`======= ENV: ${this.env} =======`);
      console.info(`🚀 App listening on the port ${this.port}`);
      console.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }
  }

  private initializeMiddlewares() {
    /**
     * Override the x-forwarded-proto header with custom x-forwarded-proto header if needed.
     * When node instance is behind an ALB, the x-forwarded-proto is overriden with an incorrect scheme,
     * x-wm-forwarded-proto is used to get the actual scheme value.
     */
    const validProto = ['http', 'https'];
    const CUSTOM_PROTO_KEY = 'x-wm-forwarded-proto';
    this.app.use((req, res, next) => {
      const proxiedProto = req.headers[CUSTOM_PROTO_KEY];
      if (typeof proxiedProto === 'string' && validProto.indexOf(proxiedProto.toLowerCase()) !== -1) {
        req.headers['x-forwarded-proto'] = proxiedProto;
      }
      next();
    });

    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.connectToDatabase();
    this.initializeSendFormatToRes();
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());

    this.initializeRoutes(this.routes);

    //this.initializeSwagger();
    this.initializeErrorHandling();
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use(`/${gcpRoute || ''}`, route.router);
    });

    //If no routes matches, the controll will be passed to this middleware
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      const err = new NotFoundError(`API not Found: ${req.method} ${req.path}`);
      next(err);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeSendFormatToRes() {
    this.app.use(function (req: Request, res: Response, next: NextFunction) {
      res.sendformat = (data: unknown, code = 200) => {
        if (typeof data === 'object') {
          return res.status(code).send({ code, ...data });
        } else {
          return res.status(code).send({ code, data: data });
        }
      };
      next();
    });
  }
}

export default App;
