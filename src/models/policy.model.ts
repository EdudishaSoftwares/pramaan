import { Schema, Document } from 'mongoose';
// Databases
import { MONGO_CONNECTION_INSTANCES } from '@/databases';

const dbConnection = MONGO_CONNECTION_INSTANCES.pramaan;

interface IPolicySchema extends Document {
  name: string;
  privilege: string;
  conditions: Record<string, string>;
  resource_conditions: Record<string, string>;
}

const policySchema: Schema = new Schema({
  name: { type: String, required: true },
  privilege: { type: Schema.Types.ObjectId, ref: 'Privilege', required: true },
  conditions: { type: Map, of: Schema.Types.Mixed },
  resource_conditions: { type: Map, of: Schema.Types.Mixed },
});

const PolicyModel = dbConnection.model<IPolicySchema>('Policy', policySchema);
export default PolicyModel;
