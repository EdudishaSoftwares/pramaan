import AuthenticateService from '@/services/authenticate.service';
import { Request, Response, NextFunction } from 'express';

class SessionMiddleware {
  private authenticateService = new AuthenticateService();

  /**
   * Validates session and sets req.actor and req.session.
   * @param req - The HTTP request object containing session token in the headers or cookies.
   * @param res - The HTTP response object used to send the response back to the client.
   * @param next - Calls the next middleware or the controller function if validation succeeds.
   */
  public async validate(req: Request, res: Response, next: NextFunction) {
    try {
      const sessionToken = (req.headers['session-token'] as string) || req.cookies['session_token'];

      if (!sessionToken) {
        return res.status(401).json({ error: 'Session token is missing' });
      }

      // Call the existing validateSession function to validate the session and fetch user details
      const validationResult = await this.authenticateService.validateSession(sessionToken);

      const { session, user } = validationResult;

      req.actor = user;
      req.session = session;

      next();
    } catch (error) {
      // Handle errors properly here if needed, or use next(error) to pass it to global error handler
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default SessionMiddleware;
