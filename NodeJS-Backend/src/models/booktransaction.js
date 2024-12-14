const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const BookTransaction = sequelize.define(
    "BookTransaction",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bookCopyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      borrowDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      returnDate: {
        type: DataTypes.DATE,
        allowNull: true, // Cho phép null
      },
      status: {
        type: DataTypes.ENUM("Borrowed", "Returned", "Overdue"),
        allowNull: true,
        defaultValue: "Borrowed",
      },
      renew: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: "borrowtransaction",
      timestamps: true, // Sequelize vẫn tự thêm createdAt và updatedAt
    }
  );

  return BookTransaction;
};
