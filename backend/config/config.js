require('dotenv').config();

const dev = {
  username: process.env.MYSQL_USERNAME || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'account-book',
  host: process.env.MYSQL_HOST || '127.0.0.1',
  dialect: 'mysql',
  operatorAliases: false,
};

module.exports = {
  development: dev,
};
