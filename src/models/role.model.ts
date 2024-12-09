import { Schema, Document } from 'mongoose';
// Databases
import { MONGO_CONNECTION_INSTANCES } from '@/databases';

const dbConnection = MONGO_CONNECTION_INSTANCES.pramaan;

interface IRole extends Document {
  name: string; // ex "super_admin"
  description?: string;
}

const roleSchema: Schema = new Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String },
});

const RoleModel = dbConnection.model<IRole>('Role', roleSchema);
export default RoleModel;
