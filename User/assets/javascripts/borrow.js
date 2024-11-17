function renderBookBorrow(books) {
    const listBook = document.querySelector('.list-of-book-borrow');
    listBook.innerHTML = `
        <li class="borrowBook-footer">
            <div class="list-of-book-li-check">
                <input type="checkbox">
            </div>
            <p class="borrowBook-footer-selectAll">
                Chon tat ca
            </p>
            <div class="borrowBook-footer-right">
                <ul class="borrowBook-right-2button">
                    <li class="borrowBook-right-2button-li">
                        <button class="borrowBook-2button-renew">
                            Gia han</button>
                    </li>
                    <li class="borrowBook-right-2button-li">
                        <button class="borrowBook-2button-return">
                            Hoan tra</button>
                    </li>
                </ul>
            </div>
        </li>
    `;

    books.forEach(book => {
        const bookItem = document.createElement('li');
        bookItem.className = 'list-of-book-li';
        bookItem.innerHTML = `
            <div class="list-of-book-li-check">
                <input type="checkbox">
            </div>
            <div class="list-of-book-li-img">
                <img src="${book.img}" alt="${book.Bname}"
                    class="list-of-book-li-img__image">
            </div>
            <table class="list-of-book-table">
                <tbody class="list-of-book-body">
                    <tr class="list-of-book-row
                        list-of-book-rowFirst">
                        <td class="list-of-book-cl
                            list-of-book-clFirst">
                            ${book.Bname}
                        </td>
                    </tr>
                    <tr class="list-of-book-row">
                        <td class="list-of-book-cl
                            list-of-book-cl_set1">
                            So luong: ${book.amount}
                        </td>
                        <td class="list-of-book-cl
                            list-of-book-cl_set1">
                            ID: ${book.BId}
                        </td>
                        <td class="list-of-book-cl
                            list-of-book-cl_set2">
                            So lan duoc gia han: ${book.amountRenew}
                        </td>
                    </tr>
                    <tr class="list-of-book-row">
                        <td class="list-of-book-cl
                            list-of-book-cl_set1">
                            Ngay muon: ${book.borrowDate}</td>
                        <td class="list-of-book-cl
                            list-of-book-cl_set1">
                            Ngay het han: ${book.returnDate}</td>
                    </tr>
                </tbody>
            </table>
            <p class="list-of-book-status">
                Chua hoan tra
            </p>
        `

        listBook.appendChild(bookItem);
    });
}

renderBookBorrow(BookBorrow);