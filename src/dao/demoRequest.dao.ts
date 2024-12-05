import DemoRequestModel from '@/models/demoRequest.model';
// Typing
import { IDemoRequestSchema } from '@/interfaces/demoRequest.interface';
class DemoRequestDAO {
  // Model
  private deoRequestModel = DemoRequestModel;

  /**
   * Creates new demo request.
   * @param {Partial<IDemoRequestSchema>} data - The data is payload to create new demo request.
   */
  public async createDemoRequest(data: Partial<IDemoRequestSchema>) {
    return await this.deoRequestModel.create(data);
  }
}

export default DemoRequestDAO;
