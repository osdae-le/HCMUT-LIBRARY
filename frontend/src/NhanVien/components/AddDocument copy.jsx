import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/emp_header.css";
import "../assets/css/emp_adddocument.css";
import sidebarIcon from "../assets/img/emp_managedocs_icondanhmuc.svg";
import addDocumentIcon from "../assets/img/emp_managedocs_iconthemtailieu.svg";

import { createBook } from "../../services/bookService"; // API lấy dữ liệu sách

const AddDocument = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bookName: "",
    id: "",
    image: null,
    author: "",
    datePublish: "",
    genre: "",
    quantity: "",
    status: "",
    description: "",
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
    const { name, value, files } = e.target;

    if (name === "image" && files.length > 0) {
      const file = files[0];
      setFormData({
        ...formData,
        [name]: file,
      });
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.bookName) newErrors.bookName = "Tên sách không được để trống.";
    if (!formData.id) newErrors.id = "ID không được để trống.";
    if (!formData.author) newErrors.author = "Tác giả không được để trống.";
    const publishYear = Number(formData.datePublish);
    if (!publishYear || publishYear < 1900 || publishYear > 2100)
      newErrors.datePublish = "Năm xuất bản phải nằm trong khoảng 1900 - 2100.";
    if (!formData.genre) newErrors.genre = "Thể loại không được để trống.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Vui lòng kiểm tra lại các trường thông tin.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("bookName", formData.bookName);
    formDataToSend.append("id", formData.id);
    formDataToSend.append("img", formData.image);
    formDataToSend.append("author", formData.author);
    formDataToSend.append("datePublish", formData.datePublish);
    formDataToSend.append("genre", formData.genre);
    formDataToSend.append("quantity", formData.quantity);
    formDataToSend.append("status", formData.status);
    formDataToSend.append("description", formData.description);

    console.log("FormData:", Object.fromEntries(formDataToSend.entries()));


    try {
      const response = await createBook(formDataToSend); // Sử dụng createBook thay vì axios.post

      if (response.data && response.data.errCode === 0) {
        alert("Tài liệu đã được thêm thành công!");
        navigate("/manage-docs");
      } else {
        alert(response.data.message || "Thêm tài liệu thất bại.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Đã xảy ra lỗi khi thêm tài liệu.");
    }
  };

  return (
    <div className="main-container">
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
        <button className="add-document" onClick={() => navigate("/add-document")}>
          <img src={addDocumentIcon} alt="Thêm Tài Liệu Icon" className="icon" />
          Thêm Tài Liệu
        </button>
      </aside>

      <section className="document-form">
        <h2>
          <img src={addDocumentIcon} alt="Thêm Tài Liệu Icon" className="icon" />
          THÊM TÀI LIỆU
        </h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="bookName">Tên sách</label>
          <input type="text" id="bookName" name="bookName" value={formData.bookName} onChange={handleInputChange} required />
          {errors.bookName && <span className="error">{errors.bookName}</span>}

          <label htmlFor="id">ID</label>
          <input type="text" id="id" name="id" value={formData.id} onChange={handleInputChange} required />
          {errors.id && <span className="error">{errors.id}</span>}

          <label htmlFor="image">Ảnh</label>
          <input type="file" id="image" name="image" accept="image/*" onChange={handleInputChange} />
          {previewImage && <img src={previewImage} alt="Preview" className="preview" />}

          <label htmlFor="author">Tác giả</label>
          <input type="text" id="author" name="author" value={formData.author} onChange={handleInputChange} required />
          {errors.author && <span className="error">{errors.author}</span>}

          <label htmlFor="genre">Thể loại</label>
          <input type="text" id="genre" name="genre" value={formData.genre} onChange={handleInputChange} required />
          {errors.genre && <span className="error">{errors.genre}</span>}

          <label htmlFor="datePublish">Năm xuất bản</label>
          <input type="number" id="datePublish" name="datePublish" value={formData.datePublish} min="1900" max="2100" onChange={handleInputChange} />
          {errors.datePublish && <span className="error">{errors.datePublish}</span>}

          <label htmlFor="quantity">Số lượng</label>
          <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleInputChange} />

          <label htmlFor="status">Tình trạng</label>
          <input type="text" id="status" name="status" value={formData.status} onChange={handleInputChange} />

          <label htmlFor="description">Tóm tắt nội dung</label>
          <textarea id="description" name="description" rows="4" value={formData.description} onChange={handleInputChange}></textarea>

          <button type="submit">Xác nhận</button>
        </form>
      </section>
    </div>
  );
};

export default AddDocument;
