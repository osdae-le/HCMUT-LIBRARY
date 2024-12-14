import "./regist.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createBorrow } from "../../services/borrowService";
import { getAllBorrow } from "../../services/userService";
function RegistBorrowBook() {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [bookBorrow, setBookBorrow] = useState([]);
  const user = useSelector((state) => state.auth.login?.currentUser);
  useEffect(() => {
    const fetchDataBorrow = async () => {
      try {
        const response = await getAllBorrow(user.id); // Gọi API
        setBookBorrow(response.borrow); // Lưu dữ liệu vào state
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setLoading(false); // Tắt trạng thái loading
      }
    };
    fetchDataBorrow();
  }, []);
  const searchResult = useSelector((state) => state.auth.book?.searchResult);
  const bookData = useSelector((state) => state.auth.book?.bookList);
  let RegistBorrow = bookData;
  if (searchResult.length > 2) {
    RegistBorrow = RegistBorrow.filter((book) =>
      book.bookName.toLowerCase().includes(searchResult.toLowerCase())
    );
  }
  const borrowedBook = RegistBorrow.filter((book) =>
    bookBorrow.some((borrow) => borrow.bookId === book.id)
  );

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const allBookIds = RegistBorrow.map((book) => book.id);
    setSelectedBooks(!selectAll ? allBookIds : []);
  };

  const handleCheckboxChange = (bookId) => {
    setSelectedBooks((prevSelected) =>
      prevSelected.includes(bookId)
        ? prevSelected.filter((id) => id !== bookId)
        : [...prevSelected, bookId]
    );
  };
  const handleOnclick = async () => {
    if (selectedBooks.length >= 5) {
      alert("Bạn chỉ được mượn tối đa 5 quyển sách");
      return;
    }
    const response = await createBorrow(user.id, selectedBooks);
    alert(response.message);
    navigate("/borrow");
  };
  return (
    <div className="right-under-nav">
      <div className="empty"></div>
      <div className="box-of-borrow-regist">
        <ul className="list-of-borrow-regist-book">
          {RegistBorrow.map((book, index) => (
            <li className="li-contain-cell-box" key={index}>
              <div className="cell-box-of-borrow-regist-book">
                <ul>
                  <li className="borrow-regist-column1">
                    <input
                      type="checkbox"
                      className="box-borrow-book-checkbox"
                      disabled={borrowedBook.includes(book) ? true : false}
                      checked={selectedBooks.includes(book.id)}
                      onChange={() => handleCheckboxChange(book.id)}
                    />
                  </li>
                  <li className="borrow-regist-column2">
                    <img src={book.img} alt="" />
                  </li>
                  <li className="borrow-regist-name-book">{book.bookName}</li>
                  <li className="borrow-regist-author">{book.author}</li>
                  <li className="borrow-regist-bid">
                    ID sach:
                    <p>{book.id}</p>
                  </li>
                  <li className="borrow-regist-amount">
                    So luong:
                    <p>{book.quantity}</p>
                  </li>
                  <li className="borrow-regist-status">
                    Tinh trang:
                    <p
                      className={
                        !borrowedBook.includes(book)
                          ? "registStatus-canBorrow"
                          : "registStatus-cannotBorrow"
                      }
                    >
                      {borrowedBook.includes(book)
                        ? "Bạn đang mượn rồi"
                        : "Có thể mượn"}
                    </p>
                  </li>
                  <li className="borrow-regist-delete">Xóa</li>
                </ul>
              </div>
            </li>
          ))}
          <li className="li-contain-cell-box-footer">
            <div className="list-regist-li-check">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </div>
            <div className="regist-footer-selectAll">Chọn tất cả</div>
            <div className="regist-footer-clearAll borrow-regist-delete">
              Xóa
            </div>
            <div className="regist-footer-right">
              <button
                className="regist-footer-right-button"
                onClick={() => handleOnclick()}
              >
                Mượn sách
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default RegistBorrowBook;
