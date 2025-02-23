/**
 * @description pm2 configuration file.
 * @example
 *  production mode :: pm2 start ecosystem.config.js --env production
 *  development mode :: pm2 start ecosystem.config.js --env development
 */
module.exports = {
  apps: [
    {
      name: 'pramaan', // pm2 start App name
      script: 'dist/server.js',
      exec_mode: 'cluster', // 'cluster' or 'fork'
      instances: 1, // pm2 instance count
      autorestart: true, // auto restart if process crash
      watch: false, // files change automatic restart
      ignore_watch: ['node_modules', 'logs'], // ignore files change
      max_memory_restart: '1G', // restart if process use more than 1G memory
      merge_logs: true, // if true, stdout and stderr will be merged and sent to pm2 log
      output: './logs/access.log', // pm2 log file
      error: './logs/error.log', // pm2 error log file
      env_production: {
        // environment variable
        PORT: 3015,
        NODE_ENV: 'production',
      },
      env_staging: {
        PORT: 3015,
        NODE_ENV: 'staging',
      },
      env_development: {
        PORT: 3015,
        NODE_ENV: 'development',
      },
    },
  ],
  deploy: {
    production: {
      user: 'user',
      host: '0.0.0.0',
      ref: 'origin/production',
      repo: 'git@github.com:repo.git',
      path: 'dist/server.js',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
    },
    development: {
      user: 'user',
      host: 'localhost',
      ref: 'origin/stage',
      repo: 'git@github.com:repo.git',
      path: 'dist/server.js',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env development',
      env: {
        PORT: 3015,
        NODE_ENV: 'development',
      },
      watch: true,
      ignore_watch: ['node_modules', 'logs', '.git'],
      watch_options: {
        followSymlinks: false,
      },
    },
  },
};
