import "./homepage.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from "../../services/userService.js";
import { clearSearchResult } from "../../redux/authSlice.js";
function HomepageUser() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [yearInput, setYearInput] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const bookData = useSelector((state) => state.auth.book?.bookList);
  let bookDataCopy = bookData;
  const searchResult = useSelector((state) => state.auth.book?.searchResult);
  const [selectedBook, setSelectedBook] = useState(null);
  const dispatch = useDispatch();
  if (searchResult !== "") {
    bookDataCopy = bookDataCopy.filter((book) =>
      book.bookName.toLowerCase().includes(searchResult.toLowerCase())
    );
  }
  const searchOnFilter = () => {
    dispatch(clearSearchResult());
    if (selectedGenre === "all" || selectedGenre === "") {
      console.log("selected genre", selectedGenre);
      bookDataCopy = bookData;
      if (yearInput !== "") {
        console.log("year input", yearInput);
        bookDataCopy = bookDataCopy.filter(
          (book) => book.datePublish === Number(yearInput)
        );
      }
      if (selectedStatus !== "") {
        console.log("selected status", selectedStatus);
        bookDataCopy = bookDataCopy.filter(
          (book) => book.status === selectedStatus
        );
      }
    } else {
      console.log("selected genre", selectedGenre);
      bookDataCopy = bookData.filter((book) => book.genre === selectedGenre);
      if (yearInput !== "") {
        console.log("year input", yearInput);
        bookDataCopy = bookDataCopy.filter(
          (book) => book.datePublish === Number(yearInput)
        );
      }
      if (selectedStatus !== "") {
        console.log("selected status", selectedStatus);
        bookDataCopy = bookDataCopy.filter(
          (book) => book.status === selectedStatus
        );
      }
    }
  };
  const handleChange = (event) => {
    setSelectedGenre(event.target.value);
  };
  const handleChange1 = (event) => {
    setYearInput(event.target.value);
  };
  const handleChange2 = (event) => {
    setSelectedStatus(event.target.value);
  };
  if (selectedGenre !== "" || yearInput !== "" || selectedStatus !== "")
    searchOnFilter();
  console.log("Book data copy: ", bookDataCopy);
  console.log("Book data: ", bookData);
  const chunkData = (data, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < data.length; i += chunkSize) {
      chunks.push(data.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const bookChunks = chunkData(bookDataCopy, 3);

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
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="">Thể loại</option>
                    <option value="all">Tất cả</option>
                    <option value="fiction">Tiểu thuyết</option>
                    <option value="science">Khoa học</option>
                    <option value="study">Học tập</option>
                    <option value="history">Lịch sử</option>
                    <option value="fantasy">Giả tưởng</option>
                    <option value="adventure">Phiêu lưu</option>
                    <option value="technology">Công nghệ</option>
                  </select>
                </div>
              </th>
              <th>
                <div className="table-search column2">
                  <input
                    type="number"
                    placeholder="Năm"
                    className="table-search-ip"
                    onChange={(e) => handleChange1(e)}
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
                    onChange={(e) => handleChange2(e)}
                  >
                    <option value="">Tình trạng</option>
                    <option value="Available">Có thể mượn</option>
                    <option value="Unavailable">Không thể mượn</option>
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
                    <div
                      style={{
                        textAlign: "center",
                        width: "270px",
                        marginBottom: "15px",
                      }}
                    >
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
              onClick={() => {
                setSelectedBook(null);
              }}
            >
              Đóng
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default HomepageUser;
