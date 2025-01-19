import { Schema, Document } from 'mongoose';
// Databases
import { MONGO_CONNECTION_INSTANCES } from '@/databases';

const dbConnection = MONGO_CONNECTION_INSTANCES.pramaan;

interface IPrivilege extends Document {
  name: string; //like "create_student", "edit_student"
  description?: string;
}

const privilegeSchema: Schema<IPrivilege> = new Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String },
});

const PrivilegeModel = dbConnection.model<IPrivilege>('Privilege', privilegeSchema);

export default PrivilegeModel;
