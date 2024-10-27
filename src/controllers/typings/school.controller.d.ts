/**
 * All all entry-point typings for request body of controller using their validators here
 */

import * as schollControllerValidator from '@/controllers/validators/school.controller.validation';
import { z } from 'zod';

/**
 * naming convention - {controller_method_name_in_CapitalizeCase}${RequestBody/RequestParams/RequestQuery}
 */
export type createSchoolRequestBody = z.infer<typeof schollControllerValidator.createSchoolSchema>;
