const Sequelize = require('sequelize')
const db = require('../db')

const Picture = db.define('picture', {
  time: {
    type: Sequelize.STRING
  },
  latDir: {
    type: Sequelize.STRING
  },
  latCoo: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  longDir: {
    type: Sequelize.STRING
  },
  longCoo: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  brand: {
    type: Sequelize.STRING
  },
  model: {
    type: Sequelize.STRING
  },
  URL: {
    type: Sequelize.STRING
  },
  caption: {
    type: Sequelize.TEXT
  }
})

module.exports = Picture
