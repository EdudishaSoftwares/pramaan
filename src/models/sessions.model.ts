import { Schema, Document } from 'mongoose';
// Databases
import { MONGO_CONNECTION_INSTANCES } from '@/databases';

const dbConnection = MONGO_CONNECTION_INSTANCES.pramaan;

interface SessionDocument extends Document {
  sessionToken: string;
  userId: Schema.Types.ObjectId;
  expiresAt: Date;
}

const sessionSchema = new Schema<SessionDocument>(
  {
    sessionToken: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'userProfile',
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

const SessionModel = dbConnection.model<SessionDocument>('Session', sessionSchema);

export default SessionModel;
