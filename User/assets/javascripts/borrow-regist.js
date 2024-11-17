function renderRegistBook(books) {
    const listBook = document.querySelector('.list-of-borrow-regist-book');
    listBook.innerHTML = `
        <li class="li-contain-cell-box-footer">
            <div class="list-regist-li-check">
                <input type="checkbox" name="" id="">
            </div>
            <div class="regist-footer-selectAll">
                Chọn tất cả
            </div>
            <div class="regist-footer-clearAll borrow-regist-delete">
                Xóa
            </div>
            <div class="regist-footer-right">
                <button class="regist-footer-right-button">
                    Mượn sách
                </button>
            </div>
        </li>
    `;

    books.forEach(book => {
        const bookItem = document.createElement('li');
        bookItem.className = 'li-contain-cell-box';

        // Đặt class của <p> dựa trên trạng thái status
        const statusClass = book.status === "Có thể mượn" 
            ? "registStatus-canBorrow" 
            : "registStatus-cannotBorrow";

        bookItem.innerHTML = `
            <div class="cell-box-of-borrow-regist-book">
                <ul>
                    <li class="borrow-regist-column1">
                        <input type="checkbox" class="box-borrow-book-checkbox">
                    </li>
                    <li class="borrow-regist-column2">
                        <img src="${book.img}" alt="">
                    </li>
                    <li class="borrow-regist-name-book">
                        ${book.Bname}
                    </li>
                    <li class="borrow-regist-author">
                        ${book.author}
                    </li>
                    <li class="borrow-regist-bid">
                        ID sách:
                        <p>${book.BId}</p>
                    </li>
                    <li class="borrow-regist-amount">
                        Số lượng: 
                        <p>${book.amount || 1}</p>
                    </li>
                    <li class="borrow-regist-status">
                        Tình trạng:
                        <p class="${statusClass}">${book.status}</p>
                    </li>
                    <li class="borrow-regist-delete">
                        Xóa
                    </li>
                </ul>
            </div>
        `;
        listBook.appendChild(bookItem);
    });
}


renderRegistBook(RegistBorrow);

function toggleSelectAll(selectAllCheckbox) {
    const checkboxes = document.querySelectorAll(".box-borrow-book-checkbox");
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
    });
}

document.querySelector(".list-regist-li-check input[type='checkbox']").addEventListener("change", function () {
    toggleSelectAll(this);
});