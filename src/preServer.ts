import apm from 'elastic-apm-node';
import config, { apm_service } from './config';

const { is_production } = config;
(() => {
  Promise.resolve()
    .then(() => {
      apm.start({
        // Override service name from config.env.json
        serviceName: apm_service?.name || 'prashth',
        serverUrl: apm_service?.url,
        active: is_production && !!apm_service?.url,
      });
    })
    .then(() => require('./server') as object);
})();
