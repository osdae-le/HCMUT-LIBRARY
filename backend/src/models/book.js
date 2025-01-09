"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true, // Thêm autoIncrement
        unique: true,
      },
      
      bookName: DataTypes.STRING,
      author: DataTypes.STRING,
      datePublish: DataTypes.INTEGER,
      genre: DataTypes.STRING,
      description: DataTypes.TEXT,
      quantity: DataTypes.INTEGER,
      img: {
        type: DataTypes.STRING,
        allowNull: true, // Chấp nhận null nếu ảnh không bắt buộc
      },

      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Book",
      timestamps: true,
    }
  );
  return Book;
};
