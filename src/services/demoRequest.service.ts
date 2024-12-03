// Dao
import DemoRequestDAO from '@/dao/demoRequest.dao';
import SessionDAO from '@/dao/session.dao';
// Helpers
import EmailHelper from '@/helpers/email.helper';
// Formatters
import { DemoRequestFormatter } from '@/formatters/demoRequest.formatter';
// Typings
import { BookDemoRequestData } from '@/typings/demoRequest';

class DemoRequestService {
  // Dao
  private demoRequestDAO = new DemoRequestDAO();
  private sessionDAO = new SessionDAO();
  // Helpers
  private emailHelper = new EmailHelper();
  // Formatters
  private demoRequestFormatter = new DemoRequestFormatter();
  /**
   * Validate demo request and create new demo request entry in DB.
   * @param {BookDemoRequestData} bookDemoRequestData
   */
  public bookDemoRequest = async (bookDemoRequestData: BookDemoRequestData) => {
    // Format user data.
    const formattedBookDemoRequestData = this.demoRequestFormatter.formatNewDemoRequestData(bookDemoRequestData);

    // Create user entry in DB.
    await this.demoRequestDAO.createDemoRequest(formattedBookDemoRequestData);

    // Sending demo booking confirmation mail to visitor.
    await this.emailHelper.sendBookDemoRequestEmail(bookDemoRequestData.email, bookDemoRequestData.prefferedDate);

    return { message: 'Free demo booking confirmation sent to your email' };
  };
}

export default DemoRequestService;
