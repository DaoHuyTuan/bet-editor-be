const Sequelize = require('sequelize')

const db = require('../db/database')

const Post = db.define('post', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  pair_id: Sequelize.STRING,
  symbol: Sequelize.STRING,
  pair_value: Sequelize.STRING,
  pair_name: Sequelize.STRING,
  twitter: Sequelize.STRING,
  website: Sequelize.STRING,
  logo: Sequelize.STRING,
  github: Sequelize.STRING,
  description: Sequelize.TEXT
})

module.exports = Post
