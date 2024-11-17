function renderBookHistory(books) {
    const historyContainer = document.querySelector('.list_of_history_book');
    historyContainer.innerHTML = '';

    books.forEach(book => {
        const bookItem = document.createElement('li');
        bookItem.className = 'list_history_book_li';
        bookItem.innerHTML = `
            <div class="list-history-book-box">
                <div class="list-history-book-boxLeft">
                    <img src="${book.img}" alt="${book.Bname}" class="list-history-book-boxImage">
                </div>
                <div class="list-history-book-boxRight">
                    <table class="history-book-tableInfo">
                        <tbody class="history-book-tableInfo-body">
                            <tr class="history-book-tableInfo-row history-book-tableInfo-row1">
                                <td class="history-book-tableInfo-cl">${book.Bname} - ${book.author}</td>
                            </tr>
                            <tr class="history-book-tableInfo-row">
                                <td class="history-book-tableInfo-cl history-book-tableInfo-cl1">Số lượng: 1</td>
                                <td class="history-book-tableInfo-cl history-book-tableInfo-cl1">ID: ${book.BId}</td>
                            </tr>
                            <tr class="history-book-tableInfo-row">
                                <td class="history-book-tableInfo-cl history-book-tableInfo-cl1">Ngày mượn: ${book.borrowDate}</td>
                                <td class="history-book-tableInfo-cl history-book-tableInfo-cl1">Ngày hết hạn: ${book.returnDate}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p class="history-book-textStatus-${book.status === 'Đã hoàn trả' ? 'return' : 'notReturn'}">
                        ${book.status}
                    </p>
                </div>
            </div>
        `;
        historyContainer.appendChild(bookItem);
    });
}

renderBookHistory(bookReturn);