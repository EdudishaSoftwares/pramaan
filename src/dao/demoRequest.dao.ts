import DemoRequestModel from '@/models/demoRequest.model';
import { IDemoRequestSchema } from '@/interfaces/demoRequest.interface';
class DemoRequestDAO {
  // Model
  private deoRequestModel = DemoRequestModel;

  /**
   * Creates new demo request.
   * @param {IDemoRequestSchema} data - The data is payload to create new demo request.
   */
  public async createDemoRequest(data: IDemoRequestSchema) {
    return await this.deoRequestModel.create(data);
  }
}

export default DemoRequestDAO;
