// controllers/SchoolController.ts
import { Request, Response } from 'express';
import SchoolService from '@/services/school.service';
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

  public createSchool = async (req: Request<{}, {}, createSchoolRequestBody>, res: Response) => {
    const schoolData = req.body;
    const createdSchool = await this.schoolService.createSchool(schoolData);
    return res.status(201).json(createdSchool);
  };
}

export default SchoolController;
