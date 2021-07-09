const knexfile = require('./knexfile.js');
const environment = process.env.NODE_ENV;
const config = require('./knexfile')[environment]
const knex = require('knex');
module.exports = require('knex')(config);