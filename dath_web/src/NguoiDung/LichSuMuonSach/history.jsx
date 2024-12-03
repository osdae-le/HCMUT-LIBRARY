import './history.css';
import { bookReturn } from './data';

function HistoryBookBorrow() {
    return (
        <div className="right-under-nav">
            <div className="empty"></div>
            <div class="table_history_book">
                <div class="table-history-book">
                    <ul class="list_of_history_book">
                        {bookReturn.map((book, index) => (
                            <li className="list_history_book_li" key={index}>
                                <div className="list-history-book-box">
                                    <div className="list-history-book-boxLeft">
                                        <img src={require(`${book.img}`)} alt="" 
                                        className='list-history-book-boxImage'/>
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