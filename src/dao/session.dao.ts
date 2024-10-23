import { SessionModel } from '@/models/sessions.model';

export class SessionDAO {
  public async createSession(sessionToken: string, userId: string, expiresAt: Date) {
    return await SessionModel.create({
      sessionToken,
      userId,
      expiresAt,
    });
  }

  /**
   * Retrieves a session based on the provided session token.
   * @param {string} sessionToken - The session token that identifies the session in the database.
   * @returns The session document from the database, or null if the session is not found.
   */
  public async findBySessionToken(sessionToken: string) {
    return await SessionModel.findOne({ sessionToken }).exec();
  }
}
