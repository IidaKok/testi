const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const BookCopy = sequelize.define(
  "BookCopy",
  {
    idbookcopy: {
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
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    purchasedate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    condition: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.DECIMAL,
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
    tableName: "bookcopies",
    timestamps: false,
  }
);

module.exports = BookCopy;