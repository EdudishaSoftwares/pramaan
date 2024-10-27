import { Schema, Document } from 'mongoose';
// Databases
import { MONGO_CONNECTION_INSTANCES } from '@/databases';

const dbConnection = MONGO_CONNECTION_INSTANCES.pramaan;

export interface ISchool extends Document {
  name: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
  };
  boardAffiliation: 'CBSE' | 'ICSE' | 'State' | 'International';
  boardAffiliationNumber: string;
  establishmentYear: number;
  contactInfo: {
    phone: string[];
    email: string[];
  };
  principalName: string;
}

const SchoolSchema: Schema = new Schema({
  name: { type: String, required: true },
  address: {
    line1: { type: String, required: true },
    line2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  boardAffiliation: { type: String, enum: ['CBSE', 'ICSE', 'State', 'International'], required: true },
  boardAffiliationNumber: { type: String, required: true, unique: true },
  establishmentYear: { type: Number, required: true },
  contactInfo: {
    phone: { type: [String], required: true },
    email: { type: [String], required: true },
  },
  principalName: { type: String, required: true },
});

const School = dbConnection.model<ISchool>('School', SchoolSchema);
export default School;
