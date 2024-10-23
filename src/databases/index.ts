// Modules
import mongoose from 'mongoose';

// Config
import * as config from '@config';
// import { database: DATABASE_CONFIG } from '@config';
import { IDatabaseClient } from '@/typings/config';
const { database: DATABASE_CONFIG } = config;
const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  mongoose.set('debug', true);
}

const MONGO_DBS = ['pramaan'];

const mongoConnectionInstances: Record<string, mongoose.Connection> = {};

/**
 * returns db path for mongoose to connect to
 * @param dbConfig
 * @returns {string}
 */
const getConnectionURL = (dbConfig: IDatabaseClient) =>
  `${dbConfig.client}://${[
    `${dbConfig.connection.host}`,
    ...(isProduction ? (dbConfig.replicas || []).map(connection => `${connection.host}:${connection.port}`) : []),
  ].join(',')}/${dbConfig.connection.name}`;

/**
 * returns db connection
 * @returns {*}
 * @param dbConfig
 * @param options
 */
const getDBConnection = (dbConfig: IDatabaseClient, options: any) => {
  const connect = mongoose.createConnection(getConnectionURL(dbConfig), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ...options,
  } as mongoose.ConnectOptions);
  return connect;
};

/**
 * initializes connection instances
 * @private
 */
export const _initializeMongoConnections = () => {
  MONGO_DBS.forEach(dbName => {
    const dbConfig = DATABASE_CONFIG[dbName as keyof typeof DATABASE_CONFIG] as IDatabaseClient;

    if (!dbConfig) {
      throw new Error('Database not supported');
    }

    const options = isProduction
      ? {
          readPreference: 'secondaryPreferred',
          replicaSet: dbConfig.replset_name,
        }
      : {};

    mongoConnectionInstances[dbName] = getDBConnection(dbConfig, options);
  });
};

_initializeMongoConnections();

export const MONGO_CONNECTION_INSTANCES = mongoConnectionInstances;
