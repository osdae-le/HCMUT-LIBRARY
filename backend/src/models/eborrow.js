'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class eBorrows extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  eBorrows.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true, // Đảm bảo giá trị id là duy nhất
    },
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    bookCopyId: DataTypes.INTEGER,
    borrowDate: DataTypes.DATE,
    // dd_timeType: DataTypes.STRING,
    // ard_timeType: DataTypes.STRING,
    returnDate: DataTypes.DATE,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'eBorrows',
  });
  return eBorrows;
};