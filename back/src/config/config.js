const db = require('../db/db');
const dotenv = require('dotenv').config();
const env = process.env.NODE_ENV;
  
const development = {
    "name": process.env.DEV_SRV_NAME,
    "host":process.env.DEV_HOT,
    "database": db,
    "port": process.env.DEV_PORT,
    "redis_url": process.env.DEV_REDIS_HOST,
    "redis_port": process.env.DEV_REDIS_PORT,
    "session_secret": process.env.DEV_SESSION_SECRET
}

const test = {
    "name": process.env.TEST_SRV_NAME,
    "host":process.env.TEST_HOST,
    "database": db,
    "port": process.env.TEST_PORT,
    "redis_url": process.env.DEV_REDIS_HOST,
    "redis_port": process.env.DEV_REDIS_PORT,
    "session_secret": process.env.DEV_SESSION_SECRET
}


const config = {
    "development": development,
    "test": test
};
module.exports = config[env];