const { stack } = require('../app');
const config = require('dotenv').config({  
    path: process.env.NODE_ENV === "test" ? ".env" : ".env"
  })
if (config.error) {
    console.log(config.error);
    throw config.error;

  }
const { parsed: envs } = config;

module.exports = config
