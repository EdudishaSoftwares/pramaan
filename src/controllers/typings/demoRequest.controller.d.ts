/**
 * All all entry-point typings for request body of controller using their validators here
 */

import * as demoRequestControllerValidator from '@/controllers/validators/demoRequest.controller.validation';
import { z } from 'zod';

/**
 * naming convention - {controller_method_name_in_camelCase}${RequestBody/RequestParams/RequestQuery}
 */
export type bookDemoRequestBody = z.infer<typeof demoRequestControllerValidator.bookDemoRequestBodyParser>;
