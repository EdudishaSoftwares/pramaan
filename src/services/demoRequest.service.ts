// Dao
import DemoRequestDAO from '@/dao/demoRequest.dao';
// Helpers
import EmailHelper from '@/helpers/email.helper';
// Formatters
import { DemoRequestFormatter } from '@/formatters/demoRequest.formatter';
// Typings
import { CreateDemoReqestInDb } from '@/typings/demoRequest';

class DemoRequestService {
  // Dao
  private demoRequestDAO = new DemoRequestDAO();
  // Helpers
  private emailHelper = new EmailHelper();
  // Formatters
  private demoRequestFormatter = new DemoRequestFormatter();
  /**
   * Validate demo request and create new demo request entry in DB.
   * @param {BookDemoRequestData} bookDemoRequestData
   */
  public bookDemoRequest = async (bookDemoRequestData: CreateDemoReqestInDb) => {
    // Create demo request entry in DB.
    await this.demoRequestDAO.createDemoRequest(bookDemoRequestData);

    return { message: 'Success' };
  };
}

export default DemoRequestService;
