// Dao
import DemoRequestDAO from '@/dao/demoRequest.dao';
// Helpers
import EmailHelper from '@/helpers/email.helper';
// Formatters
import { DemoRequestFormatter } from '@/formatters/demoRequest.formatter';
// Interfaces
import { IDemoRequestSchema } from '@/interfaces/demoRequest.interface';

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
  public bookDemoRequest = async (bookDemoRequestData: IDemoRequestSchema) => {
    // Sending demo booking confirmation mail to visitor.
    await this.emailHelper.sendBookDemoRequestEmail(bookDemoRequestData.email, bookDemoRequestData.preffered_date);

    // Create demo request entry in DB.
    await this.demoRequestDAO.createDemoRequest(bookDemoRequestData);

    return { message: 'Success' };
  };
}

export default DemoRequestService;
