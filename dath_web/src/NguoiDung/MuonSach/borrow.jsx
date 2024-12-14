import "./borrow.css";
import { renewBorrow, returnBorrow } from "../../services/borrowService";
import { getAllBorrow } from "../../services/userService";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
function BorrowBook() {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [triggerReload, setTriggerReload] = useState(0);
  const [loading, setLoading] = useState(true);
  const bookList = useSelector((state) => state.auth.book.bookList);
  const user = useSelector((state) => state.auth.login.currentUser);
  const [bookBorrow, setBookBorrow] = useState([]);
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
  }, [triggerReload]);
  const BookBorrow = bookList
    .filter((book) => bookBorrow.some((borrow) => borrow.bookId === book.id))
    .map((book) => {
      const borrowInfo = bookBorrow.find((borrow) => borrow.bookId === book.id);
      return {
        ...book,
        borrowId: borrowInfo.id,
        borrowDate: borrowInfo.borrowDate,
        returnDate: borrowInfo.returnDate,
        renew: borrowInfo.renew,
        status: borrowInfo.status, // Thêm trường status vào object
      };
    });
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const allBookIds = bookBorrow.map((book) => book.id);
    setSelectedBooks(!selectAll ? allBookIds : []);
  };

  const handleCheckboxChange = (bookId) => {
    setSelectedBooks((prevSelected) =>
      prevSelected.includes(bookId)
        ? prevSelected.filter((id) => id !== bookId)
        : [...prevSelected, bookId]
    );
  };
  const handleOnRenew = async () => {
    if (!selectedBooks.length) {
      alert("Please choose a book to renew");
      return;
    }
    const bookBorrowCopy = bookBorrow.filter(
      (book) =>
        selectedBooks.some((selected) => selected === book.id) &&
        book.renew >= 2
    );
    if (bookBorrowCopy.length > 0) {
      alert("Some books are not able to be renewed !!!");
      return;
    }
    let response = await renewBorrow(selectedBooks);
    console.log("response: ", response);
    alert("Thông báo: " + response.message);
    setTriggerReload(triggerReload + 1);
  };
  const handleOnReturn = async () => {
    if (!selectedBooks.length) {
      alert("Please choose a book to return");
      return;
    }
    let response = await returnBorrow(selectedBooks);
    alert("Thông báo: " + response.message);
    setTriggerReload(triggerReload + 1);
  };
  return (
    <div className="right-under-nav">
      <div className="empty"></div>
      <div className="right-mainBox">
        <div className="empty"></div>
        <ul className="list-of-book-borrow">
          {BookBorrow.map((book, index) => (
            <li className="list-of-book-li" key={index}>
              <div className="list-of-book-li-check">
                <input
                  type="checkbox"
                  disabled={book.status === "Returned" ? true : false}
                  checked={selectedBooks.includes(book.borrowId)}
                  onChange={() => handleCheckboxChange(book.borrowId)}
                />
              </div>
              <div className="list-of-book-li-img">
                <img
                  src={book.img}
                  alt=""
                  className="list-of-book-li-img__image"
                />
              </div>
              <table className="list-of-book-table">
                <tbody className="list-of-book-body">
                  <tr className="list-of-book-row list-of-book-rowFirst">
                    <td
                      className="list-of-book-cl
                                         list-of-book-clFirst"
                    >
                      {book.bookName}
                    </td>
                  </tr>
                  <tr className="list-of-book-row">
                    <td
                      className="list-of-book-cl
                                         list-of-book-cl_set1"
                    >
                      ID: {book.id}
                    </td>
                    <td
                      className="list-of-book-cl
                                         list-of-book-cl_set2"
                    >
                      Số lần được gia hạn: {book.renew}
                    </td>
                  </tr>
                  <tr className="list-of-book-row">
                    <td
                      className="list-of-book-cl
                                         list-of-book-cl_set1"
                    >
                      Ngày mượn:{" "}
                      {new Date(book.borrowDate).toISOString().split("T")[0]}
                    </td>
                    <td
                      className="list-of-book-cl
                                         list-of-book-cl_set1"
                    >
                      Ngày hết hạn:{" "}
                      {new Date(book.returnDate).toISOString().split("T")[0]}
                    </td>
                  </tr>
                </tbody>
              </table>
              <p
                className={
                  book.status === "Borrowed"
                    ? "list-of-book-status-borrow"
                    : "list-of-book-status-return"
                }
              >
                {book.status === "Borrowed" ? "Đang mượn" : "Đã trả"}
              </p>
            </li>
          ))}
          <li className="borrowBook-footer">
            <div className="list-of-book-li-check">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </div>
            <p className="borrowBook-footer-selectAll">Chọn tất cả</p>
            <div className="borrowBook-footer-right">
              <ul className="borrowBook-right-2button">
                <li className="borrowBook-right-2button-li">
                  <button
                    className="borrowBook-2button-renew"
                    onClick={() => handleOnRenew()}
                  >
                    Gia hạn
                  </button>
                </li>
                <li className="borrowBook-right-2button-li">
                  <button
                    className="borrowBook-2button-return"
                    onClick={() => handleOnReturn()}
                  >
                    Hoàn trả
                  </button>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default BorrowBook;
