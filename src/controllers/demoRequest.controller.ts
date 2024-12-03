// Modules
import { Response, Request } from 'express';
// Services
import DemoRequestService from '@/services/demoRequest.service';
// Typings
import { bookDemoRequestBody } from './typings/demoRequest.controller';

class DemoRequestController {
  // Services
  private demoRequestService = new DemoRequestService();

  /**
   * Handles demo requests booking.
   * - Called From: Client application for user booking demo requests.
   * - DAOs: DemoRequestDao to create new user.
   * ```
   * POST /api/v1/platform/demo-request/booking
   * ```
   * @param req - The HTTP request object containing the demo booking details.
   * @param res - The HTTP response object used to send the response back to the client.
   */
  public bookDemoRequest = async (req: Request<{}, {}, bookDemoRequestBody>, res: Response) => {
    const { first_name: firstName, last_name: lastName, email, message, preffered_date: prefferedDate } = req.body;

    const bookDemoRequestData = { firstName, lastName, email, message, prefferedDate };

    await this.demoRequestService.bookDemoRequest(bookDemoRequestData);

    res.status(200).json({ message: 'Success' });
  };
}

export default DemoRequestController;
