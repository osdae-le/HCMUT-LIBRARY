import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/emp_header.css";
import "../assets/css/emp_adddocument.css";
import sidebarIcon from "../assets/img/emp_managedocs_icondanhmuc.svg";
import addDocumentIcon from "../assets/img/emp_managedocs_iconthemtailieu.svg";

import { createBook } from "../../services/bookService";

const AddDocument = () => {
  const navigate = useNavigate();

  const [bookData, setBookData] = useState({
    id: "",
    bookName: "",
    author: "",
    datePublish: "",
    genre: "",
    description: "",
    quantity: 0,
    img: "",
    status: "Available",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});

  const categories = [
    "Tất cả",
    "Bảo dưỡng công nghiệp",
    "Cơ khí",
    "Kỹ thuật địa chất và dầu khí",
    "Điện - Điện tử",
    "Kỹ thuật giao thông",
    "Kỹ thuật hóa học",
    "Môi trường và tài nguyên",
    "Khoa học và kỹ thuật máy tính",
    "Quản lý công nghiệp",
    "Khoa học ứng dụng",
    "Công nghệ vật liệu",
    "Kỹ thuật xây dựng",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
    console.log(`Input Changed: ${name} = ${value}`); // Log giá trị input khi thay đổi
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", bookData); // Log dữ liệu khi gửi form

    try {
      const response = await createBook(bookData);
      console.log("API Response:", response.data); // Log phản hồi từ server
      alert("Book added successfully!");
    } catch (error) {
      console.error("API Error:", error); // Log lỗi từ server
      alert("Failed to add book: " + error.message);
    }
  };

  return (
    <div className="main-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h3>
          <img src={sidebarIcon} alt="Danh mục Icon" className="icon" />
          DANH MỤC
        </h3>
        <ul>
          {categories.map((category, index) => (
            <li key={index}>
              <a href="/manage-docs">{category}</a>
            </li>
          ))}
        </ul>
        <button
          className="add-document"
          onClick={() => navigate("/add-document")}
        >
          <img src={addDocumentIcon} alt="Thêm Tài Liệu Icon" className="icon" />
          Thêm Tài Liệu
        </button>
      </aside>

      {/* Form Section */}
      <section className="document-form">
        <h2>
          <img
            src={addDocumentIcon}
            alt="Thêm Tài Liệu Icon"
            className="icon"
          />
          THÊM TÀI LIỆU
        </h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="bookName">Tên sách</label>
          <input
            type="text"
            id="bookName"
            name="bookName"
            value={bookData.bookName}
            onChange={handleInputChange}
            required
          />
          {errors.bookName && <span className="error">{errors.bookName}</span>}

          <label htmlFor="author">Tác giả</label>
          <input
            type="text"
            id="author"
            name="author"
            value={bookData.author}
            onChange={handleInputChange}
            required
          />
          {errors.author && <span className="error">{errors.author}</span>}

          <label htmlFor="img">URL Ảnh</label>
          <input
            type="text"
            id="img"
            name="img"
            placeholder="Nhập URL ảnh (VD: https://example.com/image.jpg)"
            value={bookData.img}
            onChange={handleInputChange}
            required
          />
          {errors.img && <span className="error">{errors.img}</span>}
          {bookData.img && (
            <img
              src={bookData.img}
              alt="Preview"
              className="preview"
              style={{ maxWidth: "200px", marginTop: "10px" }}
            />
          )}

          <label htmlFor="genre">Thể loại</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={bookData.genre}
            onChange={handleInputChange}
          />

          <label htmlFor="datePublish">Năm xuất bản</label>
          <input
            type="number"
            id="datePublish"
            name="datePublish"
            value={bookData.datePublish}
            min="1900"
            max="2100"
            onChange={handleInputChange}
          />

          <label htmlFor="quantity">Số lượng</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={bookData.quantity}
            min="1"
            onChange={handleInputChange}
          />

          <label htmlFor="description">Tóm tắt</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={bookData.description}
            onChange={handleInputChange}
          ></textarea>

          <button type="submit" >Xác nhận</button>
        </form>
      </section>
    </div>
  );
};

export default AddDocument;
