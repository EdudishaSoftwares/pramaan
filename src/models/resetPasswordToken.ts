// Modules
import { Schema } from 'mongoose';
// Database
import { MONGO_CONNECTION_INSTANCES } from '@/databases';
// Interfaces
import { IResetPasswordTokenSchema } from '@/interfaces/resetPasswordToken.interface';

const dbConnection = MONGO_CONNECTION_INSTANCES.pramaan;

// Create the OTP schema
const resetPasswordTokenSchema = new Schema<IResetPasswordTokenSchema>(
  {
    // User profile mongo ID ref.
    user_id: { type: Schema.Types.ObjectId, ref: 'userProfile', required: true },
    // 64 char unique hashed token
    token: { type: String, required: true, unique: true },
    // Token expiry time
    expires_at: { type: Date, required: true },
  },
  {
    // To track createdAt and updatedAt fields
    timestamps: true,
  },
);

const ResetPasswordTokenModel = dbConnection.model<IResetPasswordTokenSchema>('resetPasswordToken', resetPasswordTokenSchema);

export default ResetPasswordTokenModel;
