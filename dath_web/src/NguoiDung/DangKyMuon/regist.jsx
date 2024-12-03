import './regist.css';
import {RegistBorrow} from './data.jsx';
import { useState } from 'react';

function RegistBorrowBook() {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedBooks, setSelectedBooks] = useState([]);

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        const allBookIds = RegistBorrow.map(book => book.BId);
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
        <div className='right-under-nav'>
            <div className="empty"></div>
            <div className="box-of-borrow-regist">
                <ul className="list-of-borrow-regist-book">
                    {RegistBorrow.map((book, index) => (
                        <li className="li-contain-cell-box" key={index}>
                            <div className="cell-box-of-borrow-regist-book">
                                <ul>
                                    <li className="borrow-regist-column1">
                                        <input type="checkbox" className="box-borrow-book-checkbox"
                                        checked={selectedBooks.includes(book.BId)}
                                        onChange={() => handleCheckboxChange(book.BId)}/>
                                    </li>
                                    <li className="borrow-regist-column2">
                                        <img src={require(`${book.img}`)} alt="" />
                                    </li>
                                    <li className="borrow-regist-name-book">
                                        {book.Bname}
                                    </li>
                                    <li className="borrow-regist-author">
                                        {book.author}
                                    </li>
                                    <li className="borrow-regist-bid">
                                        ID sach: 
                                        <p>{book.BId}</p>
                                    </li>
                                    <li className="borrow-regist-amount">
                                        So luong:
                                        <p>{book.amount}</p>
                                    </li>
                                    <li className="borrow-regist-status">
                                        Tinh trang:
                                        <p className={book.status === "Có thể mượn" ? "registStatus-canBorrow" : "registStatus-cannotBorrow"}>
                                            {book.status}
                                        </p>
                                    </li>
                                    <li className="borrow-regist-delete">
                                        Xóa
                                    </li>
                                </ul>
                            </div>
                        </li>
                    ))}
                    <li className="li-contain-cell-box-footer">
                        <div className="list-regist-li-check">
                            <input type="checkbox" 
                            checked={selectAll}
                            onChange={handleSelectAll}/>
                        </div>
                        <div className="regist-footer-selectAll">
                            Chọn tất cả
                        </div>
                        <div className="regist-footer-clearAll borrow-regist-delete">
                            Xóa
                        </div>
                        <div className="regist-footer-right">
                            <button className="regist-footer-right-button">
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