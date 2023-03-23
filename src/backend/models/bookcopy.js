const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class BookCopy extends Model {}

BookCopy.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    bookname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    edition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publicationyear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idbook: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    purchaseprice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    purchasedate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    condition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    solddate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    soldprice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    idbookseries: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idbookshelf: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'bookcopy',
  }
);

module.exports = BookCopy;