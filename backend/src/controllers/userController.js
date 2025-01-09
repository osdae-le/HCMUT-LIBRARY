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
  console.log("Get all Books: ", books);
  return res.status(200).json({
    books: books || [],
  });
};
let handleGetAllBorrow = async (req, res) => {
  let id = req.params.id;
  try {
    let borrow = await userService.handleGetAllBorrow(id);
    console.log("Get all borrow: ", borrow);
    return res.status(200).json({
      borrow: borrow || [],
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
let handleGetAllHistory = async (req, res) => {
  let id = req.params.id;
  try {
    let history = await userService.handleGetAllHistory(id);
    return res.status(200).json({
      history: history || [],
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
module.exports = {
  handleLogin: handleLogin,
  handleGetAllBooks: handleGetAllBooks,
  handleGetAllBorrow: handleGetAllBorrow,
  handleGetAllHistory: handleGetAllHistory,
};
