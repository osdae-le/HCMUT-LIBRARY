
let selectedTd = null;

function renderInfoBook(book, tdElement) {
    const detailBox = document.getElementById("box-have-detail-book");
    detailBox.style.display = "block";

    if (detailBox.classList.contains("AddAnimationShowBook")) {
        detailBox.classList.remove("AddAnimationShowBook");
    }
    detailBox.classList.add("AddAnimationShowBook");

    detailBox.querySelector(".fill-info-img").src = book.img;
    detailBox.querySelector(".fill-info-img").alt = book.Bname;
    detailBox.querySelector("#book-name").textContent = book.Bname;
    detailBox.querySelector("#book-author").textContent = book.author;
    detailBox.querySelector("#book-id").textContent = book.BId;
    detailBox.querySelector("#book-date").textContent = book.Date_publish;
    detailBox.querySelector("#book-status").textContent = book.status;

    const statusElement = detailBox.querySelector("#book-status");
    const _button = document.getElementById("info-of-book__button");
    if (book.status === "Không thể mượn") {
        statusElement.style.color = "#E02601";
        _button.style.backgroundColor = "fff";
        _button.style.cursor = "unset";
    } else {
        statusElement.style.color = "";
        _button.style.cursor = "pointer";
    }

    if (selectedTd) {
        selectedTd.style.border = "none";
    }

    tdElement.style.border = "7px solid #13319C";
    selectedTd = tdElement;
}

function renderTable(books) {
    const tableBody = document.querySelector("#list-of-book tbody");

    tableBody.innerHTML = `
        <tr>
            <td>
                <div class="table-search column2">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        class="table-search-Down"
                        onclick="openSelect()">
                        <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
                    </svg>
                    <select id="table-search-genre" name="genre" aria-label="Chọn thể loại">
                        <option value="" disabled selected>Thể loại</option>
                        <option class="table-option" value="fiction">Tiểu thuyết</option>
                        <option class="table-option" value="science">Khoa học</option>
                        <option class="table-option" value="history">Lịch sử</option>
                        <option class="table-option" value="biography">Tiểu sử</option>
                        <option class="table-option" value="fantasy">Giả tưởng</option>
                        <option class="table-option" value="adventure">Phiêu lưu</option>
                        <option class="table-option" value="self-help">Tự lực</option>
                    </select>
                </div>
            </td>
            <td>
                <div class="table-search column2">
                    <input type="number" placeholder="Năm"
                        class="table-search-ip">
                </div>
            </td>
            <td>
                <div class="table-search column2">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        class="table-search-Down"
                        onclick="openSelect()">
                        <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
                    </svg>
                    <select id="table-search-status" name="status" aria-label="Tình trạng"
                            onchange="filterBooks()">
                        <option value="" disabled selected>Tình trạng</option>
                        <option class="table-option" value="canBorrow">Có thể mượn</option>
                        <option class="table-option" value="cannotBorrow">Không thể mượn</option>
                    </select>
                </div>
            </td>
        </tr>
    `;

    let row;
    books.forEach((book, index) => {
        if (index % 3 === 0) {
            row = document.createElement("tr");
            tableBody.appendChild(row);
        }

        const cell = document.createElement("td");
        cell.classList.add("book-have-cursor");

        const img = document.createElement("img");
        img.src = book.img;
        img.alt = book.Bname;
        img.classList.add("image-book", "column2");

        cell.onclick = () => renderInfoBook(book, img);
        

        cell.appendChild(img);
        row.appendChild(cell);
    });
}


function filterBooks() {
    const statusSelect = document.getElementById("table-search-status").value;

    const statusMapping = {
        canBorrow: "Có thể mượn",
        cannotBorrow: "Không thể mượn",
    };

    const filteredBooks = book.filter((b) => b.status === statusMapping[statusSelect]);

    renderTable(filteredBooks);
}


renderTable(book);