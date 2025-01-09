import db from "../models/index";
let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let user = await db.User.findOne({
        where: { email: email },
        raw: true,
      });
      if (user) {
        let check = user.password == password;
        if (check) {
          userData.errCode = 0;
          userData.errMessage = "Ok";
          delete user.password;
          userData.user = user;
        } else {
          userData.errCode = 1;
          userData.errMessage = "Wrong password";
        }
      } else {
        userData.errCode = 2;
        userData.errMessage = "Invalid username";
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};
let handleGetAllBooks = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let books = await db.Book.findAll({ raw: true });
      resolve(books);
    } catch (error) {
      reject(error);
    }
  });
};
let handleGetAllBorrow = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let borrow = await db.BookTransaction.findAll({
        where: { userId: id, status: "Borrowed" },
        raw: true,
      });
      resolve(borrow);
    } catch (error) {
      reject(error);
    }
  });
};
let handleGetAllHistory = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let borrow = await db.BookTransaction.findAll({
        where: { userId: id },
        raw: true,
      });
      resolve(borrow);
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  handleUserLogin: handleUserLogin,
  handleGetAllBooks: handleGetAllBooks,
  handleGetAllBorrow: handleGetAllBorrow,
  handleGetAllHistory: handleGetAllHistory,
};
