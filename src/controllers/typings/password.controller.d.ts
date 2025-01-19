/**
 * All all entry-point typings for request body of controller using their validators here
 */

import PasswordValidators from '@/controllers/validators/password.controller.validation';
import { z } from 'zod';

/**
 * naming convention - {controller_method_name_in_camelCase}${RequestBody/RequestParams/RequestQuery}
 */
export type resetPasswordRequestBody = z.infer<typeof PasswordValidators.resetPasswordSchema>;
export type updatePasswordRequestBody = z.infer<typeof PasswordValidators.updatePasswordSchema>;
export type sendForgotPasswordLinkRequestBody = z.infer<typeof PasswordValidators.sendForgotPasswordLinkSchema>;
