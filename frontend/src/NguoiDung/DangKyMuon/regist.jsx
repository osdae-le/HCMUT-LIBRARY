import './regist.css';
//import { RegistBorrow } from './data.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createBorrow } from '../../services/borrowService.js';
import { getAllBooks } from '../../services/userService.js';

function RegistBorrowBook(props) {
    const [RegistBorrow, setBookData] = useState([]); // Dữ liệu sách từ API
    const [selectAll, setSelectAll] = useState(false);
    const [selectedBooks, setSelectedBooks] = useState([]);
    let userData = props.getStateFromParent();
    userData = userData.user;

    const navigate = useNavigate(); // Hook để điều hướng

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const books = await getAllBooks();
                setBookData(books?.books || []); // Đảm bảo dữ liệu là mảng
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
            }
        };

        fetchBooks();
    }, []); // Chỉ chạy khi component render lần đầu

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        const allBookIds = RegistBorrow.map(book => book.id);
        setSelectedBooks(!selectAll ? allBookIds : []);
    };

    const handleCheckboxChange = (bookId) => {
        setSelectedBooks((prevSelected) =>
            prevSelected.includes(bookId)
                ? prevSelected.filter(id => id !== bookId)
                : [...prevSelected, bookId]
        );
    };

    const handleOnclick = async () => {
        const response = await createBorrow(userData.id, selectedBooks);
        window.alert(response.message);
        navigate('/history');
    }

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
                                            checked={selectedBooks.includes(book.id)}
                                            onChange={() => handleCheckboxChange(book.id)} />
                                    </li>
                                    <li className="borrow-regist-column2">
                                        <img src={book.img} alt="" />
                                    </li>
                                    <li className="borrow-regist-name-book">
                                        {book.bookName}
                                    </li>
                                    <li className="borrow-regist-author">
                                        {book.author}
                                    </li>
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
                                        <p className={book.status === "Available" ? "registStatus-canBorrow" : "registStatus-cannotBorrow"}>
                                            {book.status === "Available" ? "Có thể mượn" : "Đã hết"}
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
                                onChange={handleSelectAll} />
                        </div>
                        <div className="regist-footer-selectAll">
                            Chọn tất cả
                        </div>
                        <div className="regist-footer-clearAll borrow-regist-delete">
                            Xóa
                        </div>
                        <div className="regist-footer-right">
                            <button className="regist-footer-right-button"
                                onClick={() => handleOnclick()}>
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