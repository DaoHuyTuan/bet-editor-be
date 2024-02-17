const Sequelize1 = require('sequelize')
const sequelize = new Sequelize1(
  process.env.PG_DB,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    dialect: 'postgres'
  }
)

module.exports = sequelize
