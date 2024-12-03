import "./homepage.css";
import { useState, useEffect } from "react";
import { getAllBooks } from "../../services/userService.js";
function HomepageUser() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [bookData, setBookData] = useState([]); // Khởi tạo state với mảng rỗng
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hàm bất đồng bộ để lấy dữ liệu
    const fetchData = async () => {
      try {
        const books = await getAllBooks(); // Gọi API
        setBookData(books.books); // Lưu dữ liệu vào state
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setLoading(false); // Tắt trạng thái loading
      }
    };

    fetchData(); // Gọi hàm
  }, []); // Chỉ chạy một lần sau khi component render
  const handleChange = (event) => {
    setSelectedGenre(event.target.value);
  };
  //console.log("Book data: ", bookData.books);
  const chunkData = (data, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < data.length; i += chunkSize) {
      chunks.push(data.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const bookChunks = chunkData(bookData, 3);

  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedTd, setSelectedTd] = useState(null);

  const renderInfoBook = (book, tdElement) => {
    setSelectedBook(book);

    if (selectedTd) {
      selectedTd.style.border = "none";
    }
    tdElement.style.border = "6px solid rgba(18,125,216,0.3)";
    setSelectedTd(tdElement);
  };

  return (
    <>
      <div className="right-under-nav">
        <div className="empty"></div>
        <table id="list-of-book">
          <thead>
            <tr>
              <th>
                <div className="table-search column2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="table-search-Down"
                  >
                    <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                  </svg>
                  <select
                    id="table-search-genre"
                    name="genre"
                    aria-label="Chọn thể loại"
                    value={selectedGenre}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Thể loại
                    </option>
                    <option value="fiction">Tiểu thuyết</option>
                    <option value="science">Khoa học</option>
                    <option value="history">Lịch sử</option>
                    <option value="biography">Tiểu sử</option>
                    <option value="fantasy">Giả tưởng</option>
                    <option value="adventure">Phiêu lưu</option>
                    <option value="self-help">Tự lực</option>
                  </select>
                </div>
              </th>
              <th>
                <div className="table-search column2">
                  <input
                    type="number"
                    placeholder="Năm"
                    className="table-search-ip"
                  />
                </div>
              </th>
              <th>
                <div className="table-search column2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="table-search-Down"
                  >
                    <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                  </svg>
                  <select
                    id="table-search-status"
                    name="status"
                    aria-label="Tình trạng"
                  >
                    <option value="" disabled>
                      Tình trạng
                    </option>
                    <option value="canBorrow">Có thể mượn</option>
                    <option value="cannotBorrow">Không thể mượn</option>
                  </select>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {bookChunks.map((chunk, index) => (
              <tr key={index} className="HP-table-row">
                {chunk.map((book) => (
                  <td key={book.id} className="book-have-cursor">
                    <img
                      src={book.img}
                      alt=""
                      className="image-book column2"
                      onClick={(e) => renderInfoBook(book, e.currentTarget)}
                    />
                    <div style={{ display: "flex", textAlign: "center" }}>
                      {book.bookName}
                    </div>
                  </td>
                ))}
                {/* Thêm ô trống nếu nhóm chưa đủ 3 */}
                {Array.from({ length: 3 - chunk.length }).map((_, idx) => (
                  <td key={`empty-${idx}`} className="book-have-cursor"></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="empty"></div>
        {selectedBook && (
          <div
            className="info-of-book AddAnimationShowBook"
            id="box-have-detail-book"
            style={{ display: "block" }}
          >
            <ul className="contain-info-book">
              <li className="constain-info">Thông tin sách</li>
              <li>
                <img
                  src={selectedBook.img}
                  alt={selectedBook.bookName}
                  className="fill-info-img"
                />
              </li>
              <li className="constain-info">ID sách</li>
              <li className="fill-info" id="book-id">
                {selectedBook.id}
              </li>
              <li className="constain-info">Tên sách</li>
              <li className="fill-info" id="book-name">
                {selectedBook.bookName}
              </li>
              <li className="constain-info">Tác giả</li>
              <li className="fill-info" id="book-author">
                {selectedBook.author}
              </li>
              <li className="constain-info">Năm xuất bản</li>
              <li className="fill-info" id="book-date">
                {selectedBook.datePublish}
              </li>
              <li className="constain-info">Tình trạng</li>
              <li
                className="fill-info only-status"
                id="book-status"
                style={{
                  color: selectedBook.status === "Available" ? "#E02601" : "",
                }}
              >
                {selectedBook.status}
              </li>
            </ul>
            <button
              id="info-of-book__button"
              style={{
                backgroundColor:
                  selectedBook.status === "Không thể mượn" ? "#c2c2c2" : "",
                cursor:
                  selectedBook.status !== "Available" ? "unset" : "pointer",
              }}
            >
              Mượn sách
            </button>
          </div>

        )}
      </div>
    </>
  );
}

export default HomepageUser;

