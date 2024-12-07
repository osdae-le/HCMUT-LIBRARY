import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import bookController from "../controllers/bookController";
import borrowController from "../controllers/borrowController";

let router = express.Router();
let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);

  //router.get("/create-a-user", homeController.createNewUser);
  router.get("/create-a-staff", homeController.createNewStaff);
  router.post("/api/login", userController.handleLogin);

  // Book CRUD routes
  router.get("/api/get-all-books", userController.handleGetAllBooks);
  router.post("/api/create-book", bookController.handleAddBook); // Tạo sách mới
  router.delete("/api/delete-book/:id", bookController.handleDeleteBook); // Xóa sách
  router.put("/api/update-book/:id", bookController.handleUpdateBook);  // Sửa sách theo ID

  // BookCopy CRUD routes
  router.get("/api/get-all-bookCoppy", userController.handleGetAllBookCopy);

  //eBorrow bookCoppy
  router.get("/api/get-eborrow/:id", userController.handleGetEBorrow);
  router.post("/api/create-eborrow/:id", borrowController.handleAddBorrow);

  return app.use("/", router);
};
module.exports = initWebRoutes;
