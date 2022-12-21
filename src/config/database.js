const config = require('./sequelize')
module.exports = {
  dialect: 'mysql',
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_SCHEMA ,
  host: process.env.DATABASE_HOST,
  port: 3306
}
