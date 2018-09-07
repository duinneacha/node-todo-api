// Configuration Data for thse Node Project

var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
  const config = require('./config.json');
  const envConfig = config[env];

  // Grab the environment settings held in the config.json file
  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];

  })
}

