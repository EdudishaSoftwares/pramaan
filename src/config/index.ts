import nconf from 'nconf';

import { IApmService, IConfigOptional, IDatabase, IEmailConfig, IServer, IServices } from '@/typings/config';

/**
 * Return all the config from this file only
 */

const env = process.env.NODE_ENV || 'development';
const isProduction = env === 'production';
const filePath = env === 'development' ? `src/config/config.${env}.json` : `dist/config/config.${env}.json`;

nconf.argv().env().file({ file: filePath });

const config: IConfigOptional = {};

config.NODE_ENV = env;
config.LOG_FORMAT = 'combined';
config.LOG_DIR = '../logs';
config.is_production = isProduction;

export const PORT = (nconf.get('server') as IServer).port;
export const database = nconf.get('database') as IDatabase;
export const apm_service = nconf.get('apm_service') as IApmService;
export const service_name = nconf.get('service_name') as string;
export const gcpRoute = nconf.get('gcp_route') as string;
export const is_production = isProduction;

export const port = (() => {
  return PORT;
})();

export const services = (() => {
  return nconf.get('services') as IServices;
})();

export const email = (() => {
  return nconf.get('email') as IEmailConfig;
})();

export const maxAllowedSessions = (() => {
  return nconf.get('max_allowed_sessions') as number;
})();

export default config;
