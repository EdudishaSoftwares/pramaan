// Modules
import { Schema, Document } from 'mongoose';
//DATABASE
import { MONGO_CONNECTION_INSTANCES } from '../databases';
// import { required } from 'nconf';
const dbConnection = MONGO_CONNECTION_INSTANCES.pramaan;

const pramaan = new Schema();

const CustomHomePageModel = dbConnection.model<Document>('demo', pramaan);
export { CustomHomePageModel };
