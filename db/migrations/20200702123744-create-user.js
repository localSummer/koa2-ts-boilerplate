/* eslint-disable @typescript-eslint/camelcase */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'user',
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: ''
        },
        preferred_name: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null
        },
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE
      },
      {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
      }
    );
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('user');
  }
};
