/**
 * All your utils should stay here
 * Your util function should be pure!
 * i.e they should accept some argument, and then return some result without any side-effect
 * Further, they are not allowed to call any other functions
 */

// Modules
import { NextFunction, Request, Response } from 'express';
// Constants
import { emailRegex, phoneNumberRegex } from '@/constants/common.constants';
import { UserIdentifier } from '@/constants/enum';

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

/**
 * Wrap your function in an async try-catch block.
 * @param {Function} controllerFunction
 * @returns
 */
export const asyncWrapper = (controllerFunction: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controllerFunction(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

/**
 * Get user identifier type.
 * @param {string} identifier
 * @returns
 */
export const getUserIdentifierType = (identifier: string): UserIdentifier => {
  if (phoneNumberRegex.test(identifier)) {
    return UserIdentifier.PhoneNumber;
  } else if (emailRegex.test(identifier)) {
    return UserIdentifier.Email;
  } else {
    return UserIdentifier.UserId;
  }
};
