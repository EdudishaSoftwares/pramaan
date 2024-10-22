import { SessionModel } from '@/models/sessions.model';

export class SessionDAO {
  public async createSession(sessionToken: string, userId: string, expiresAt: Date) {
    return await SessionModel.create({
      sessionToken,
      userId,
      expiresAt,
    });
  }
}
