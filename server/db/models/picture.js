const Sequelize = require('sequelize')
const db = require('../db')

const Picture = db.define('picture', {
  title: {
    type: Sequelize.STRING
  },
  time: {
    type: Sequelize.STRING
  },
  latCoo: {
    type: Sequelize.DECIMAL(10, 5)
  },
  longCoo: {
    type: Sequelize.DECIMAL(10, 5)
  },
  brand: {
    type: Sequelize.STRING
  },
  model: {
    type: Sequelize.STRING
  },
  url: {
    type: Sequelize.STRING
  },
  caption: {
    type: Sequelize.TEXT
  }
})

module.exports = Picture
