// bookController.js
import bookService from "../services/bookService";  // Import service

let handleAddBook = async (req, res) => {
  try {
    // Lấy dữ liệu sách từ body của yêu cầu
    let bookData = req.body;

    // Gọi hàm handleAddBook trong service để thêm sách
    let newBook = await bookService.handleAddBook(bookData);

    console.log("Book Added Successfully: ", newBook);

    // Trả về phản hồi thành công
    return res.status(201).json({
      message: "Book added successfully",
      book: newBook,
    });
  } catch (error) {
    console.error("Error adding book: ", error);

    // Trả về phản hồi lỗi
    return res.status(500).json({
      message: "Failed to add book",
      error: error.message,
    });
  }
};


let handleDeleteBook = async (req, res) => {
  try {
    const bookId = req.params.id; // Lấy id sách từ params

    // Gọi service để xóa sách
    let result = await bookService.handleDeleteBook(bookId);

    if (result) {
      return res.status(200).json({
        message: "Book deleted successfully",
      });
    } else {
      return res.status(404).json({
        message: "Book not found",
      });
    }
  } catch (error) {
    console.error("Error deleting book: ", error);
    return res.status(500).json({
      message: "Failed to delete book",
      error: error.message,
    });
  }
};

let handleUpdateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const { bookName, author, datePublish, genre, description, quantity, img, status } = req.body;

    const bookData = {
      bookName,
      author,
      datePublish,
      genre,
      description,
      quantity,
      img,
      status,
    };

    const updatedBook = await bookService.handleUpdateBook(bookId, bookData);

    return res.status(200).json({ message: 'Sách đã được sửa thành công', book: updatedBook });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Lỗi khi sửa sách' });
  }
};

module.exports = { handleAddBook , handleDeleteBook, handleUpdateBook};