'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('teams', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      location: { type: Sequelize.STRING },
      mascot: { type: Sequelize.STRING },
      abbreviation: { type: Sequelize.STRING },
      conference: { type: Sequelize.ENUM, values: ['AFC', 'NFC'] },
      division: {
        type: Sequelize.ENUM,
        values: ['North', 'South', 'East', 'West']
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP '
        )
      },
      deletedAt: { type: Sequelize.DATE }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('teams')
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      
    */
  }
}
