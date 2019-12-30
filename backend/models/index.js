const path = require('path');
const sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'db-config.json'))[env];
const db = {};

const seq = new sequelize(config.database, config.username, config.password, config);

db.seq = seq;
db.sequelize = sequelize;

db.users = require('./users')(seq, sequelize);
db.transactions = require('./transactions')(seq, sequelize);

module.exports = db;
