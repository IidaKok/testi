const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const BookCopy = sequelize.define(
  "BookCopy",
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
      allowNull: true,
    },
    publicationyear: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    idbook: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    purchaseprice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    purchasedate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    condition: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    solddate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    soldprice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    idbookseries: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    idbookshelf: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "bookcopies",
    timestamps: false,
  }
);

module.exports = BookCopy;