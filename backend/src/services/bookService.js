import db from "../models/index";

let handleAddBook = (bookData) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Sử dụng Sequelize để tạo một bản ghi mới trong bảng `books`
      let newBook = await db.Book.create({
        bookName: bookData.bookName,
        author: bookData.author,
        datePublish: bookData.datePublish,
        genre: bookData.genre,
        description: bookData.description,
        quantity: bookData.quantity,
        img: bookData.img,
        status: bookData.status,
      });

      console.log("New Book Added: ", newBook);
      resolve(newBook); // Trả về bản ghi sách vừa được thêm
    } catch (error) {
      reject(error); // Trả về lỗi nếu xảy ra vấn đề
    }
  });
};


let handleDeleteBook = async (bookId) => {
  try {
    // Tìm sách trong database
    const book = await db.Book.findOne({
      where: { id: bookId },
    });

    if (!book) {
      return false; // Sách không tồn tại
    }

    // Xóa sách
    await book.destroy();
    return true;
  } catch (error) {
    console.error("Error deleting book: ", error);
    throw new Error("Failed to delete book");
  }
};

let handleUpdateBook = async (bookId, bookData) => {
  try {
    // Tìm sách theo ID
    const book = await db.Book.findOne({
      where: { id: bookId },
    });

    if (!book) {
      throw new Error("Book not found"); // Ném lỗi nếu sách không tồn tại
    }

    // Cập nhật sách với dữ liệu mới
    await book.update(bookData);

    return book; // Trả về bản ghi sách sau khi cập nhật
  } catch (error) {
    console.error("Error updating book: ", error);
    throw error; // Ném lỗi để controller xử lý
  }
};

module.exports = { handleAddBook , handleDeleteBook, handleUpdateBook};
