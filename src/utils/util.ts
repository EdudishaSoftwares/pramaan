import { NextFunction, Request, Response } from 'express';

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export const asyncWrapper = (controllerFunction: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controllerFunction(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
