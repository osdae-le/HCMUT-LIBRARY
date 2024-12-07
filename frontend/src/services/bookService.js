import axios from "../axios";

// API Thêm sách
const createBook = (bookData) => {
  return axios.post("/api/create-book", bookData);
};

// API Sửa sách
const updateBook = (bookId, bookData) => {
  return axios.put(`/api/update-book/${bookId}`, bookData);
};

// API Xóa sách
const deleteBook = (bookId) => {
  return axios.delete(`/api/delete-book/${bookId}`);
};

export {createBook, updateBook, deleteBook };
