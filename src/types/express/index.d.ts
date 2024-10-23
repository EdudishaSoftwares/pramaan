import { ISessionSchema, IUserSchema } from '@/interfaces/user.interface';

export {};

declare global {
  namespace Express {
    export interface Response {
      sendformat: <Data>(data: Data, code?: number) => Response;
    }

    export interface Request {
      actor?: Omit<IUserSchema, 'password'>;
      session?: ISessionSchema;
    }
  }
}
