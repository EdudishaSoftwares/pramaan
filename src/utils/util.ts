import { UserIdentifier } from '@/constants/enum';
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

export const getUserIdentifierType = (identifier: string): UserIdentifier => {
  const phoneRegex = /^[6-9]\d{9}$/;
  const emailRegex = /\S+@\S+\.\S+/;

  if (phoneRegex.test(identifier)) {
    return UserIdentifier.PhoneNumber;
  } else if (emailRegex.test(identifier)) {
    return UserIdentifier.Email;
  } else {
    return UserIdentifier.UserId;
  }
};
