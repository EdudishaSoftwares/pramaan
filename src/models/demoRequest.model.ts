import { Schema } from 'mongoose';
import { MONGO_CONNECTION_INSTANCES } from '@/databases';
import { IDemoRequestSchema } from '@/interfaces/demoRequest.interface';

const dbConnection = MONGO_CONNECTION_INSTANCES.pramaan;

// Create the DemoRequest schema
const demoRequest = new Schema<IDemoRequestSchema>(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String },
    preffered_date: { type: Date, required: true },
  },
  {
    timestamps: true,
  },
);

const DemoRequestModel = dbConnection.model<IDemoRequestSchema>('DemoRequest', demoRequest);

export default DemoRequestModel;