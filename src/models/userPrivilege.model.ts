import { Schema, Document } from 'mongoose';
// Databases
import { MONGO_CONNECTION_INSTANCES } from '@/databases';

const dbConnection = MONGO_CONNECTION_INSTANCES.pramaan;

interface IUserPrivilege extends Document {
  user: Schema.Types.ObjectId;
  privilege: Schema.Types.ObjectId;
  start_time?: Date;
  end_time?: Date;
  resource_conditions?: Record<string, string>;
}

const userPrivilegeSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  privilege: { type: Schema.Types.ObjectId, ref: 'Privilege', required: true },
  start_time: { type: Date },
  end_time: { type: Date },
  resource_conditions: { type: Map, of: Schema.Types.Mixed },
});

const UserPrivilegeModel = dbConnection.model<IUserPrivilege>('UserPrivilege', userPrivilegeSchema);
export default UserPrivilegeModel;
