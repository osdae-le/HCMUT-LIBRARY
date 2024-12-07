import userService from "../services/userService";
let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!",
    });
  }
  let userData = await userService.handleUserLogin(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user,
  });
};
let handleGetAllBooks = async (req, res) => {
  let books = await userService.handleGetAllBooks();
  //console.log("Get all Books: ", books);
  return res.status(200).json({
    books: books ||[],
  });
};
let handleGetAllBookCopy = async (req, res) => {
  let bookCopy = await userService.handleGetAllBookCopy();
  console.log("Get all BookCopy: ", bookCopy);
  return res.status(200).json({
    bookCopy: bookCopy ||[],
  });
};
let handleGetEBorrow = async (req, res) => {
  try {
    // Lấy userId từ params hoặc body hoặc query của request
    let userId = req.params.id;

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    // Gọi service để lấy eborrow theo userId
    let eborrow = await userService.handleGetEBorrowByUserId(userId);

    console.log("Get Eborrow for User ID:", userId, "Result:", eborrow);

    // Trả về dữ liệu với status code 200
    return res.status(200).json({
      eborrow: eborrow || [],
      raw: true
    });
  } catch (error) {
    console.error("Error in handleGetEBorrowByUserId:", error);
    // Xử lý lỗi và trả về status code 500
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
module.exports = {
  handleLogin: handleLogin,
  handleGetAllBooks: handleGetAllBooks,
  handleGetEBorrow: handleGetEBorrow,
  handleGetAllBookCopy: handleGetAllBookCopy,
};
