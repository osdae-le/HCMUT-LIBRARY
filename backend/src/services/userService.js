// import { handleBorrowBook } from "../controllers/borrowController";
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
      //console.log("Get all Books: ", books);
      resolve(books);
    } catch (error) {
      reject(error);
    }
  });
};
let handleGetAllBookCopy = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let bookCopy = await db.BookCopy.findAll({ raw: true });
      console.log("Get all BookCoppy: ", bookCopy);
      resolve(bookCopy);
    } catch (error) {
      reject(error);
    }
  });
};
let handleGetEBorrowByUserId = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let eBorrow = {};
      let user = await db.User.findOne({
        where: { id: userId },
        raw: true
      });
  
      if (user) {
        // Lấy danh sách eBorrows của user
        const eBorrowData = await db.eBorrows.findAll({
          where: { userId: userId },
          raw: true
        });
  
        if (eBorrowData.length > 0) {
          for (let eBorrowItem of eBorrowData) {
            let bookcopy = await db.BookCopy.findOne({
              where: {id : eBorrowItem.bookCopyId},
              raw: true
            })

            let book = await db.Book.findOne({
              where: { id: bookcopy.bookId },
              raw: true
            });
            eBorrowItem.book = book || null; // Gán thông tin sách hoặc null nếu không tìm thấy
          }
  
          eBorrow.data = eBorrowData;
        } else {
          eBorrow.data = [];
        }
      } else {
        eBorrow.errCode = 2;
        eBorrow.errMessage = "Invalid username";
      }
  
      resolve(eBorrow);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  handleUserLogin: handleUserLogin,
  handleGetAllBooks: handleGetAllBooks,
  handleGetEBorrowByUserId: handleGetEBorrowByUserId,
  handleGetAllBookCopy: handleGetAllBookCopy,
};
