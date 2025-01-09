const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const BookCopy = sequelize.define(
    "BookCopy",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      copyNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("Available", "Borrowed", "Damaged", "Lost"),
        allowNull: true,
        defaultValue: "Available",
      },
    },
    {
      tableName: "bookcopy", // Tên bảng trong cơ sở dữ liệu
      timestamps: true, // Tự động quản lý createdAt và updatedAt
    }
  );

  return BookCopy;
};
