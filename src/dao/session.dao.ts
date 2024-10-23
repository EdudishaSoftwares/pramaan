import SessionModel from '@/models/sessions.model';

class SessionDAO {
  // Model
  private sessionModel = SessionModel;

  /**
   * Creates a session based on the session token.
   * @param {string} sessionToken - The session token to identify the session.
   * @param {string} userId - The userId is MongoId od UserDao used for ref.
   * @param {Date} expiresAt - The expiresAt Date ti validate session validity.
   */
  public async createSession(sessionToken: string, userId: string, expiresAt: Date) {
    return await this.sessionModel.create({
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
    return await this.sessionModel.findOne({ sessionToken }).exec();
  }

  /**
   * Deletes a session based on the session token.
   * @param sessionToken - The session token to identify the session.
   */
  public async deleteSession(sessionToken: string) {
    return await this.sessionModel.deleteOne({ sessionToken });
  }
}

export default SessionDAO;
