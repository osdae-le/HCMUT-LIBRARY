import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/emp_header.css";
import "../assets/css/emp_managadocs.css";

import { getAllBooks } from "../../services/userService"; // API lấy dữ liệu sách

import sidebarIcon from "../assets/img/emp_managedocs_icondanhmuc.svg";
import backIcon from "../assets/img/emp_managedocs_back.svg";
import nextIcon from "../assets/img/emp_managedocs_next.svg";

// Danh mục sách
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

const ManageDocs = () => {
  const navigate = useNavigate();
  const [bookData, setBookData] = useState([]); // Dữ liệu sách từ API
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const booksPerPage = 10; // Số sách trên mỗi trang

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const books = await getAllBooks();
        setBookData(books?.books || []); // Đảm bảo dữ liệu là mảng
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setLoading(false); // Tắt trạng thái loading
      }
    };

    fetchBooks();
  }, []); // Chỉ chạy khi component render lần đầu

  // Tổng số trang
  const totalPages = Math.ceil(bookData.length / booksPerPage);

  // Dữ liệu sách theo trang hiện tại
  const booksToShow = bookData.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  // Hàm xử lý điều hướng đến chi tiết tài liệu
  const handleNavigateToDetail = (doc) => {
    navigate("/docs-detail", { state: { doc } });
  };


  // Chuyển trang
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
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
          Thêm Tài Liệu
        </button>
      </aside>

      {/* Content */}
      <section className="content">
        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : (
          <>
            <div className="document-grid">
              {booksToShow.map((book) => (
                <div
                  className="document-item"
                  key={book.id}
                  onClick={() => handleNavigateToDetail(book)}
                >
                  <img src={book.img} alt={book.bookName} />
                  <p className="title">{book.bookName}</p>
                  <p className="author">{book.author}</p>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
              <span>
                {currentPage} / {totalPages}
              </span>

              {/* Nút Previous */}
              <button
                className="page-button"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <img src={backIcon} alt="Previous Page" />
              </button>

              {/* Nút Next */}
              <button
                className="page-button"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                <img src={nextIcon} alt="Next Page" />
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default ManageDocs;
