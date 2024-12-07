import './history.css';
//import { bookReturn } from './data';
import { useEffect, useState } from 'react';
import { getEBorrow } from '../../services/userService';


function HistoryBookBorrow(props) {
    const [bookHistory, setBookHistory] = useState([]); // State để lưu lịch sử mượn sách

    useEffect(() => {
        // Hàm async để lấy và xử lý dữ liệu
        const fetchHistory = async () => {
            try {
                let userData = props.getStateFromParent();
                userData = userData.user;
                const response = await getEBorrow(userData.id); // Gọi API lấy dữ liệu
                const formattedData = response?.eborrow?.data.map(item => ({
                    img: item.book.img, // Ảnh bìa sách
                    Bname: item.book.bookName, // Tên sách
                    author: item.book.author, // Tác giả
                    BId: item.id, // ID mượn
                    borrowDate: new Date(item.borrowDate).toLocaleDateString('vi-VN'), // Định dạng ngày mượn
                    returnDate: new Date(item.returnDate).toLocaleDateString('vi-VN'), // Định dạng ngày hết hạn
                    status: item.status === 'Borrowed' ? 'Chưa hoàn trả' :
                        item.status === 'Overdue' ? 'Quá hạn' : 'Đã hoàn trả', // Trạng thái
                    amount: 1, // Giả sử mỗi lần mượn chỉ 1 cuốn
                }));

                setBookHistory(formattedData); // Cập nhật dữ liệu đã định dạng vào state
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error); // In ra lỗi nếu có
            }
        };

        fetchHistory(); // Gọi hàm async để tải và xử lý dữ liệu
        console.log(bookHistory);
    }, []); // Mảng phụ thuộc rỗng để chỉ chạy một lần khi component được render lần đầu

    return (
        <div className="right-under-nav">
            <div className="empty"></div>
            <div class="table_history_book">
                <div class="table-history-book">
                    <ul class="list_of_history_book">
                        {bookHistory.map((book, index) => (
                            <li className="list_history_book_li" key={index}>
                                <div className="list-history-book-box">
                                    <div className="list-history-book-boxLeft">
                                        <img src={book.img} alt=""
                                            className='list-history-book-boxImage' />
                                    </div>
                                    <div className="list-history-book-boxRight">
                                        <table className="history-book-tableInfo">
                                            <tbody className="history-book-tableInfo-body">
                                                <tr className="history-book-tableInfo-row
                                                 history-book-tableInfo-row1">
                                                    <td className="history-book-tableInfo-cl">
                                                        {book.Bname} - {book.author}
                                                    </td>
                                                </tr>
                                                <tr className="history-book-tableInfo-row">
                                                    <td className="history-book-tableInfo-cl
                                                     history-book-tableInfo-cl1">
                                                        Số lượng: {book.amount}
                                                    </td>
                                                    <td className="history-book-tableInfo-cl
                                                     history-book-tableInfo-cl1">
                                                        {book.BId}
                                                    </td>
                                                </tr>
                                                <tr className="history-book-tableInfo-row">
                                                    <td className="history-book-tableInfo-cl
                                                     history-book-tableInfo-cl1">
                                                        Ngày mượn: {book.borrowDate}
                                                    </td>
                                                    <td className="history-book-tableInfo-cl
                                                     history-book-tableInfo-cl1">
                                                        Ngày hết hạn: {book.returnDate}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <p className={book.status === "Đã hoàn trả"
                                            ? "history-book-textStatus-return"
                                            : "history-book-textStatus-notReturn"
                                        }>
                                            {book.status}
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

export default HistoryBookBorrow