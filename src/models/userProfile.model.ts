// Modules
import { Schema, Document } from 'mongoose';
// Databases
import { MONGO_CONNECTION_INSTANCES } from '../databases';
// Interfaces
import { IUserSchema } from '../interfaces/user.interface';

const dbConnection = MONGO_CONNECTION_INSTANCES.pramaan;

const userProfileSchema: Schema<IUserSchema> = new Schema(
  {
    // Unique ID for every user, generated by us with required prefix.
    user_id: { type: String, unique: true, required: true },
    // User's first name.
    first_name: { type: String, required: true },
    // User's last name.
    last_name: { type: String, required: true },
    // Link to user's profile picture.
    profile_picture: { type: String },
    // User's sassword (will be stored in encrypted form)
    password: { type: String, required: true },
    // User email will be unique.
    email: { type: String, unique: true, required: true },
    // Role will define the user's privleges and access.
    role: { type: String, enum: ['super_admin', 'admin', 'student'], required: true },
    // User type defines if the user is an end-user or from our system.
    user_type: { type: String, enum: ['system', 'user'], required: true },
    // Flag to check if user is deleted or not.
    is_active: { type: Boolean, default: true, required: true },
    // User's phone number.
    phone_number: { type: String },
    // Defines the time user last logged into the system.
    last_active: { type: Date, default: null },
    // Defines if the user has been deactivated due to no activity.
    is_deactivated: { type: Boolean, default: false, required: true },
  },
  { timestamps: true },
); // To track createdAt and updatedAt fields

const UserModel = dbConnection.model<Document & IUserSchema>('userProfile', userProfileSchema);

export { UserModel };
