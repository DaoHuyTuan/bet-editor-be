const Sequelize = require('sequelize')

const db = require('../db/database')

const Post = db.define('post', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  contents: Sequelize.TEXT,
  isPublish: Sequelize.BOOLEAN,
  tags: Sequelize.STRING,
  author: Sequelize.STRING
})

module.exports = Post
