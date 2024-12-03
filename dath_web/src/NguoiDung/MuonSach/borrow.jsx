import './borrow.css';
import { BookBorrow } from './data.jsx';
import { useState } from 'react';

function BorrowBook() {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedBooks, setSelectedBooks] = useState([]);

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        const allBookIds = BookBorrow.map(book => book.BId);
        setSelectedBooks(!selectAll ? allBookIds : []);
    };

    const handleCheckboxChange = (bookId) => {
        setSelectedBooks((prevSelected) =>
            prevSelected.includes(bookId)
                ? prevSelected.filter(id => id !== bookId)
                : [...prevSelected, bookId]
        );
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
                                <input type="checkbox" 
                                checked={selectedBooks.includes(book.BId)}
                                onChange={() => handleCheckboxChange(book.BId)}/>
                            </div>
                            <div className="list-of-book-li-img">
                                <img src={require(`${book.img}`)} alt="" 
                                className="list-of-book-li-img__image" />
                            </div>
                            <table className="list-of-book-table">
                                <tbody className="list-of-book-body">
                                    <tr className="list-of-book-row list-of-book-rowFirst">
                                        <td className="list-of-book-cl
                                         list-of-book-clFirst">
                                            {book.Bname}
                                        </td>
                                    </tr>
                                    <tr className="list-of-book-row">
                                        <td className="list-of-book-cl
                                         list-of-book-cl_set1">
                                            Số lượng: {book.amount}
                                        </td>
                                        <td className="list-of-book-cl
                                         list-of-book-cl_set1">
                                            ID: {book.BId}
                                        </td>
                                        <td className="list-of-book-cl
                                         list-of-book-cl_set2">
                                            Số lần được gia hạn: {book.amountRenew}
                                        </td>
                                    </tr>
                                    <tr className="list-of-book-row">
                                        <td className="list-of-book-cl
                                         list-of-book-cl_set1">
                                            Ngày mượn: {book.borrowDate}
                                        </td>
                                        <td className="list-of-book-cl
                                         list-of-book-cl_set1">
                                            Ngày hết hạn: {book.returnDate}
                                         </td>
                                    </tr>
                                </tbody>
                            </table>
                            <p className="list-of-book-status">
                                Chưa hoàn trả
                            </p>
                        </li>
                    ))}
                    <li className="borrowBook-footer">
                        <div className="list-of-book-li-check">
                            <input type="checkbox" 
                            checked={selectAll}
                            onChange={handleSelectAll}/>
                        </div>
                        <p className="borrowBook-footer-selectAll">
                            Chọn tất cả
                        </p>
                        <div className="borrowBook-footer-right">
                            <ul className="borrowBook-right-2button">
                                <li className="borrowBook-right-2button-li">
                                    <button className="borrowBook-2button-renew">
                                        Gia hạn
                                    </button>
                                </li>
                                <li className="borrowBook-right-2button-li">
                                    <button className="borrowBook-2button-return">
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