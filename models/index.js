const Sequelize = require('sequelize')
const FootballModel = require('./football')

const connection = new Sequelize('football', 'football', 'F00tB4LL!', {
  host: 'localhost',
  dialect: 'mysql'
})
const Teams = FootballModel(connection, Sequelize)
const Op = Sequelize.Op
module.exports = {
  Teams,
  Op
}
