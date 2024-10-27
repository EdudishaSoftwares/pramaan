// services/SchoolService.ts
import SchoolDAO from '@/dao/school.dao';
import { ISchoolDetails } from '@/typings/school';

class SchoolService {
  private schoolDAO = new SchoolDAO();

  /**
   * Manages the creation of a new school.
   * - Validates input and uses SchoolDAO to create a new school entry in the database.
   * @param schoolData - Object containing all the details of the school.
   * @returns The newly created school object if successful, or an error message if not.
   */
  public async createSchool(schoolData: ISchoolDetails) {
    // Create a new school record
    return await this.schoolDAO.createSchool(schoolData);
  }
}

export default SchoolService;
