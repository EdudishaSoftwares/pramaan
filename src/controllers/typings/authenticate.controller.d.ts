/**
 * All all entry-point typings for request body of controller using their validators here
 */

import * as authenticateControllerValidator from '@/controllers/validators/authenticate.controller.validation';
import { z } from 'zod';

/**
 * naming convention - {controller_method_name_in_CapitalizeCase}${RequestBody/RequestParams/RequestQuery}
 */
export type authenticateControllerBody = z.infer<typeof authenticateControllerValidator.authenticateControllerBodyParser>;
