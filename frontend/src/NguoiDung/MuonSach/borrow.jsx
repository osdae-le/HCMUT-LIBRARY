import './borrow.css';
//import { BookBorrow } from './data.jsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEBorrow } from '../../services/userService.js';
import { renewBorrow } from '../../services/borrowService.js';

function BorrowBook(props) {
    const [selectAll, setSelectAll] = useState(false);
    const [BookBorrow, setBookBorrow] = useState([]); // State để lưu lịch sử mượn sách
    const [selectedBooks, setSelectedBooks] = useState([]);

    const navigate = useNavigate(); // Hook để điều hướng

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
    useEffect(() => {
        // Hàm async để lấy và xử lý dữ liệu
        const fetchBorrow = async () => {
            try {
                let userData = props.getStateFromParent();
                userData = userData.user;
                const response = await getEBorrow(userData.id); // Gọi API lấy dữ liệu

                const filteredData = response?.eborrow?.data.filter(item => item.status === 'Borrowed');

                const formattedData = filteredData.map(item => ({
                    img: item.book.img, // Ảnh bìa sách
                    Bname: item.book.bookName, // Tên sách
                    author: item.book.author, // Tác giả
                    BId: item.id, // ID mượn
                    borrowDate: new Date(item.borrowDate).toLocaleDateString('vi-VN'), // Định dạng ngày mượn
                    returnDate: new Date(item.returnDate).toLocaleDateString('vi-VN'), // Định dạng ngày hết hạn
                    status: 'Chưa hoàn trả', // Luôn là 'Chưa hoàn trả' vì đã lọc chỉ Borrowed
                    amount: item.renew, // Giả sử mỗi lần mượn chỉ 1 cuốn
                }));

                setBookBorrow(formattedData); // Cập nhật dữ liệu đã định dạng vào state
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error); // In ra lỗi nếu có
            }
        };

        fetchBorrow(); // Gọi hàm async để tải và xử lý dữ liệu
    }, []); // Mảng phụ thuộc rỗng để chỉ chạy một lần khi component được render lần đầu

    const handleOnClick = async () => {
        const response = await renewBorrow(selectedBooks);
        window.alert(response.message);

        navigate('/');
    }

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
                                    onChange={() => handleCheckboxChange(book.BId)} />
                            </div>
                            <div className="list-of-book-li-img">
                                <img src={book.img} alt=""
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
                                            Số lần được gia hạn: {book.amount}
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
                                onChange={handleSelectAll} />
                        </div>
                        <p className="borrowBook-footer-selectAll">
                            Chọn tất cả
                        </p>
                        <div className="borrowBook-footer-right">
                            <ul className="borrowBook-right-2button">
                                <li className="borrowBook-right-2button-li">
                                    <button className="borrowBook-2button-renew" onClick={() => handleOnClick()}>
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