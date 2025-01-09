import "./history.css";
//import { bookReturn } from "./data";
import { useEffect, useState } from "react";
import { returnBorrow } from "../../services/borrowService";
import { useSelector } from "react-redux";
import { getAllHistory } from "../../services/userService";
function HistoryBookBorrow() {
  const [loading, setLoading] = useState(true);
  const [bookHistory, setBookHistory] = useState([]);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const bookList = useSelector((state) => state.auth.book.bookList);
  useEffect(() => {
    const fetchDataHistory = async () => {
      try {
        const response = await getAllHistory(user.id); // Gọi API
        setBookHistory(response.history); // Lưu dữ liệu vào state
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setLoading(false); // Tắt trạng thái loading
      }
    };
    fetchDataHistory();
  }, []);
  const borrowHistory = bookList
    .filter((book) => bookHistory.some((borrow) => borrow.bookId === book.id))
    .map((book) => {
      const borrowInfo = bookHistory.find(
        (borrow) => borrow.bookId === book.id
      );
      return {
        ...book,
        borrowId: borrowInfo.id,
        borrowDate: borrowInfo.borrowDate,
        returnDate: borrowInfo.returnDate,
        renew: borrowInfo.renew,
        status: borrowInfo.status, // Thêm trường status vào object
      };
    });
  return (
    <div className="right-under-nav">
      <div className="empty"></div>
      <div class="table_history_book">
        <div class="table-history-book">
          <ul class="list_of_history_book">
            {borrowHistory.map((book, index) => (
              <li className="list_history_book_li" key={index}>
                <div className="list-history-book-box">
                  <div className="list-history-book-boxLeft">
                    <img
                      src={book.img}
                      alt=""
                      className="list-history-book-boxImage"
                    />
                  </div>
                  <div className="list-history-book-boxRight">
                    <table className="history-book-tableInfo">
                      <tbody className="history-book-tableInfo-body">
                        <tr
                          className="history-book-tableInfo-row
                                                 history-book-tableInfo-row1"
                        >
                          <td className="history-book-tableInfo-cl">
                            {book.bookName} - {book.author}
                          </td>
                        </tr>
                        <tr className="history-book-tableInfo-row">
                          <td
                            className="history-book-tableInfo-cl
                                                     history-book-tableInfo-cl1"
                          >
                            ID : {book.id}
                          </td>
                        </tr>
                        <tr className="history-book-tableInfo-row">
                          <td
                            className="history-book-tableInfo-cl
                                                     history-book-tableInfo-cl1"
                          >
                            Ngày mượn:{" "}
                            {
                              new Date(book.borrowDate)
                                .toISOString()
                                .split("T")[0]
                            }
                          </td>
                          <td
                            className="history-book-tableInfo-cl
                                                     history-book-tableInfo-cl1"
                          >
                            Ngày trả:{" "}
                            {
                              new Date(book.returnDate)
                                .toISOString()
                                .split("T")[0]
                            }
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <p
                      className={
                        book.status === "Returned"
                          ? "history-book-textStatus-return"
                          : "history-book-textStatus-notReturn"
                      }
                    >
                      {book.status === "Returned" ? "Đã trả" : "Đang mượn"}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HistoryBookBorrow;
