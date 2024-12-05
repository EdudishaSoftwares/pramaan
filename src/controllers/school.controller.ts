import { Request, Response } from 'express';
// Services
import SchoolService from '@/services/school.service';
// Typings
import { createSchoolRequestBody } from './typings/school.controller';

/**
 * Handles school creation requests.
 * - Called From: Client application when adding a new school.
 * - DAOs: SchoolDAO to create a new school record in the database.
 * ````
 * POST /api/v1/platform/school/create
 * ````
 * @param req - The HTTP request object containing the school details.
 * @param res - The HTTP response object used to send the response back to the client.
 */
class SchoolController {
  private schoolService = new SchoolService();

  /**
   * @deprecated moved to pathshala
   * Handles School Creation Request.
   * - Called From: Script.
   * - DAOs: SchoolDao to create new school.
   * ```
   * POST /api/v1/platform/school/create
   * ```
   * @param req - The HTTP request object containing the schools details.
   * @param res - The HTTP response object used to send the response back to the client.
   */
  public createSchool = async (req: Request<{}, {}, createSchoolRequestBody>, res: Response) => {
    const schoolData = req.body;
    await this.schoolService.createSchool(schoolData);
    return res.sendformat({ message: 'Success' });
  };
}

export default SchoolController;
