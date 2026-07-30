'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('documentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      texto_original: {
        type: Sequelize.TEXT
      },
      resumen: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      estado: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: 'procesando'
        
      },
      mensaje_error: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Documentos');
  }
};