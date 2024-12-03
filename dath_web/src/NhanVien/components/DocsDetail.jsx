import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // React Router hooks
import "../assets/css/emp_header.css";
import "../assets/css/emp_docsdetail.css";
import sidebarIcon from "../assets/img/emp_managedocs_icondanhmuc.svg";
import addDocumentIcon from "../assets/img/emp_managedocs_iconthemtailieu.svg";
import editIcon from "../assets/img/emp_managedocs_iconchinhsua.svg";

import { deleteBook, updateBook } from "../../services/bookService";

const DocsDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [docDetails, setDocDetails] = useState(location.state?.doc || null);
  const [editingField, setEditingField] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Nếu không có dữ liệu sách, quay về trang quản lý
  useEffect(() => {
    if (!docDetails) {
      navigate("/manage-docs");
    }
  }, [docDetails, navigate]);

  const handleEdit = (field) => {
    setEditingField(field);
  };

  const handleBlur = (field, event) => {
    setDocDetails({ ...docDetails, [field]: event.target.innerText });
    setEditingField(null);
  };

  const handleSave = async () => {
    if (isSaving) return;

    setIsSaving(true);
    try {
      const updatedBook = await updateBook(docDetails.id, docDetails);
      alert("Cập nhật sách thành công!");
      setDocDetails(updatedBook.data);
    } catch (error) {
      console.error("Error updating book: ", error);
      alert("Không thể cập nhật sách. Vui lòng thử lại.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteBook = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sách này không?")) {
      try {
        await deleteBook(docDetails.id);
        alert("Xóa sách thành công!");
        navigate("/manage-docs");
      } catch (error) {
        console.error("Error deleting book: ", error);
        alert("Không thể xóa sách. Vui lòng thử lại.");
      }
    }
  };

  if (!docDetails) {
    return null; // Trả về trạng thái trống nếu không có dữ liệu
  }

  return (
    <div className="main-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h3>
          <img src={sidebarIcon} alt="Danh mục Icon" className="icon" />
          DANH MỤC
        </h3>
        <ul>
          <li><a href="/manage-docs">Tất cả</a></li>
          <li><a href="/manage-docs">Bảo dưỡng công nghiệp</a></li>
          <li><a href="/manage-docs">Cơ khí</a></li>
          <li><a href="/manage-docs">Kỹ thuật địa chất và dầu khí</a></li>
          <li><a href="/manage-docs">Điện - Điện tử</a></li>
          <li><a href="/manage-docs">Kỹ thuật giao thông</a></li>
          <li><a href="/manage-docs">Kỹ thuật hóa học</a></li>
          <li><a href="/manage-docs">Môi trường và tài nguyên</a></li>
          <li><a href="/manage-docs">Khoa học và kỹ thuật máy tính</a></li>
          <li><a href="/manage-docs">Quản lý công nghiệp</a></li>
          <li><a href="/manage-docs">Khoa học ứng dụng</a></li>
          <li><a href="/manage-docs">Công nghệ vật liệu</a></li>
          <li><a href="/manage-docs">Kỹ thuật xây dựng</a></li>
        </ul>
        <button
          className="add-document"
          onClick={() => navigate("/add-doc")}
        >
          <img src={addDocumentIcon} alt="Thêm Tài Liệu Icon" className="icon" />
          Thêm Tài Liệu
        </button>
      </aside>

      {/* Document Content */}
      <section className="document-content">
        <div className="document-detail">
          <img
            src={docDetails.img}
            alt={docDetails.bookName}
            className="document-image"
          />
          <div className="document-info">
            <h2>
              <span
                className={`editable ${editingField === "bookName" ? "editing" : ""}`}
                contentEditable={editingField === "bookName"}
                suppressContentEditableWarning
                onBlur={(e) => handleBlur("bookName", e)}
              >
                {docDetails.bookName}
              </span>
              <img
                src={editIcon}
                alt="Chỉnh sửa"
                className="edit-icon"
                onClick={() => handleEdit("bookName")}
              />
            </h2>
            <p>
              <strong>ID: </strong>
              {docDetails.id}
            </p>
            <p>
              <strong>Tác giả: </strong>
              <span
                className={`editable ${editingField === "author" ? "editing" : ""}`}
                contentEditable={editingField === "author"}
                suppressContentEditableWarning
                onBlur={(e) => handleBlur("author", e)}
              >
                {docDetails.author}
              </span>
              <img
                src={editIcon}
                alt="Chỉnh sửa"
                className="edit-icon"
                onClick={() => handleEdit("author")}
              />
            </p>
            <p>
              <strong>Năm xuất bản: </strong>
              <span
                className={`editable ${editingField === "datePublish" ? "editing" : ""}`}
                contentEditable={editingField === "datePublish"}
                suppressContentEditableWarning
                onBlur={(e) => handleBlur("datePublish", e)}
              >
                {docDetails.datePublish || "Không rõ"}
              </span>
              <img
                src={editIcon}
                alt="Chỉnh sửa"
                className="edit-icon"
                onClick={() => handleEdit("datePublish")}
              />
            </p>
            <p>
              <strong>Tình trạng: </strong>
              <span
                className={`editable ${editingField === "status" ? "editing" : ""}`}
                contentEditable={editingField === "status"}
                suppressContentEditableWarning
                onBlur={(e) => handleBlur("status", e)}
              >
                {docDetails.status}
              </span>
              <img
                src={editIcon}
                alt="Chỉnh sửa"
                className="edit-icon"
                onClick={() => handleEdit("status")}
              />
            </p>
          </div>
        </div>

        {/* Document Summary */}
        <div className="document-summary">
          <h3>TÓM TẮT NỘI DUNG</h3>
          <p>{docDetails.description || "Không có thông tin tóm tắt."}</p>
        </div>

        {/* Actions */}
        <div className="document-actions">
          <button className="save-button" onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
          <button className="delete-button" onClick={handleDeleteBook}>
            Xóa
          </button>
        </div>
      </section>
    </div>
  );
};

export default DocsDetail;
