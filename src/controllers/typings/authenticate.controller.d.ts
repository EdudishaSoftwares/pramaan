/**
 * All all entry-point typings for request body of controller using their validators here
 */

import AuthenticationValidators from '@/controllers/validators/authenticate.controller.validation';
import { z } from 'zod';

/**
 * naming convention - {controller_method_name_in_CapitalizeCase}${RequestBody/RequestParams/RequestQuery}
 */
export type userLoginRequestBody = z.infer<typeof AuthenticationValidators.authenticateControllerBodySchema>;
export type verifyOtpRequestBody = z.infer<typeof AuthenticationValidators.verifyOtpBodySchema>;
export type sendOtpRequestBody = z.infer<typeof AuthenticationValidators.sendOtpBodySchema>;
export type userSignupRequestBody = z.infer<typeof AuthenticationValidators.userSignupBodySchema>;
