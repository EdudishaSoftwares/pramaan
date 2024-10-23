import { Schema, Document } from 'mongoose';
import { MONGO_CONNECTION_INSTANCES } from '@/databases';

const dbConnection = MONGO_CONNECTION_INSTANCES.pramaan;

// Define the OTP schema
interface IOtpSchema extends Document {
  user: Schema.Types.ObjectId;
  user_id: string;
  email: string;
  otp: string;
  expiresAt: Date;
  isUsed: boolean;
}

// Create the OTP schema
const otpSchema = new Schema<IOtpSchema>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'userProfile', required: true },
    user_id: { type: String, required: true },
    email: { type: String, required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    isUsed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const OtpModel = dbConnection.model<IOtpSchema>('Otp', otpSchema);

export default OtpModel;
