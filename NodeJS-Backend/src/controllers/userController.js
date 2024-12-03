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
    books: books ||[],
  });
};
module.exports = {
  handleLogin: handleLogin,
  handleGetAllBooks: handleGetAllBooks,
};
