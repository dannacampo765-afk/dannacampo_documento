'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Documento extends Model {
    static associate(models) {
    }
  }
  Documento.init({
    titulo: {
      type:DataTypes.STRING(150),
      allowNull: false,
      validate:{
        notEmpty: true,
        len: [3, 150]
      }
    },
    texto_original:{
      type: DataTypes.TEXT,
      allowNull: false,
      validate:{
        notEmpty: true,
        len: [20, 50000]
      }
    },
    resumen: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    estado: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'procesando',
      validate: {
        isIn: [['procesando', 'completado', 'error']]
      }
    },

    mensaje_error: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, 
  {
    sequelize,
    modelName: 'Documento',
    tableName: 'documentos',
    timestamps: true,
  });
  return Documento;
};