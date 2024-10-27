import School, { ISchool } from '@/models/school.model';
import { ISchoolDetails } from '@/typings/school';

class SchoolDAO {
  private school = School;

  /**
   * Creates a new school entry in the database.
   * @param schoolData - An object containing the necessary fields for creating a school.
   * @returns A promise that resolves to the newly created school document.
   */
  public async createSchool(schoolData: ISchoolDetails): Promise<ISchool> {
    return await this.school.create(schoolData);
  }
}

export default SchoolDAO;
