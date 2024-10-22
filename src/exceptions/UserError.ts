import * as ERRORS from '@/constants/errorCodes.constants';
import { path } from 'ramda';

export class UserError extends Error {
  public status: Number;
  constructor(errorClass: string, errorCode: string, lang: string, httpStatusCode: number) {
    const errorString = path([errorClass, errorCode, lang], ERRORS) as string;

    super(errorString);

    this.name = this.constructor.name;
    this.status = httpStatusCode || 500;
  }
}
