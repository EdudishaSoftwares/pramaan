// Typings
import { BookDemoRequestData, CreateDemoReqestInDb } from '@/typings/demoRequest';

export class DemoRequestFormatter {
  /**
   * Formats data for creating new demo request in DB.
   * @param {BookDemoRequestData} bookDemoRequestData
   * @returns
   */
  public formatNewDemoRequestData = (bookDemoRequestData: BookDemoRequestData): CreateDemoReqestInDb => {
    return {
      first_name: bookDemoRequestData.firstName,
      last_name: bookDemoRequestData.lastName,
      email: bookDemoRequestData.email,
      preffered_date: bookDemoRequestData.prefferedDate,
      message: bookDemoRequestData.message,
    };
  };
}
