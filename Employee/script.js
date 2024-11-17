function navigateTo(page) {
    switch(page) {
        case 'home':
            window.location.href = 'emp_homepage.html';
            break;
        case 'manage-docs':
            window.location.href = 'emp_managedocs.html';
            break;
        case 'borrow-return':
            window.location.href = 'emp_borrow_register.html';
            break;
        case 'personal-info':
            window.location.href = 'emp_personalinfo.html';
            break;
        case 'profile':
            window.location.href = 'emp_personalinfo.html';
            break;

        // Managedocs
        case 'add-document':
            window.location.href = 'emp_adddocument.html';
            break;

        case 'hoa-dai-cuong':
            window.location.href = 'emp_docsdetail.html';
            break;
        case 'next-page':
            window.location.href = 'emp_managedocs.html';
            break;
        case 'previous-page':
            window.location.href = 'emp_managedocs.html';
            break;







        default:
            console.log("Page not found.");
    }
}

function logout() {
    alert("Đăng xuất thành công");
    window.location.href = '/logout';
}

function toggleDropdown() {
    const dropdownMenu = document.getElementById("dropdownMenu");
    dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
}

window.onclick = function(event) {
    if (!event.target.matches('.avatar')) {
        const dropdownMenu = document.getElementById("dropdownMenu");
        if (dropdownMenu && dropdownMenu.style.display === "block") {
            dropdownMenu.style.display = "none";
        }
    }
}


function toggleEdit(id) {
    const element = document.getElementById(id);

    if (element.isContentEditable) {
        // Nếu đang ở chế độ chỉnh sửa, thoát ra và lưu lại nội dung
        element.contentEditable = "false";
        element.style.border = "none";
        saveContent(id, element.innerText);
    } else {
        // Bật chế độ chỉnh sửa
        element.contentEditable = "true";
        element.style.border = "1px solid #ccc";
        element.focus();

        // Thêm sự kiện lắng nghe nhấn phím Enter
        element.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault(); // Ngăn chặn dòng mới khi nhấn Enter
                element.contentEditable = "false";
                element.style.border = "none";
                saveContent(id, element.innerText);
            }
        });
    }
}

function saveContent(id, content) {
    console.log(`Lưu nội dung cho ${id}: ${content}`);
    // Thực hiện lưu dữ liệu, có thể dùng fetch hoặc AJAX nếu lưu trên server
}


// Hàm để bật/tắt hiển thị bảng thông báo
function toggleNotification() {
    const notificationBox = document.getElementById("notificationBox");
    if (notificationBox.style.display === "none" || notificationBox.style.display === "") {
        notificationBox.style.display = "block";
    } else {
        notificationBox.style.display = "none";
    }
}

// Ẩn bảng thông báo khi nhấn vào bất kỳ nơi nào khác ngoài bảng thông báo
document.addEventListener("click", function(event) {
    const notificationBox = document.getElementById("notificationBox");
    const notifyIcon = document.querySelector(".icon-section .icon");

    if (!notificationBox.contains(event.target) && event.target !== notifyIcon) {
        notificationBox.style.display = "none";
    }
});


// Hàm để bật/tắt hiển thị bảng tin nhắn
function toggleMessageBox() {
    const messageBox = document.getElementById("messageBox");
    if (messageBox.style.display === "none" || messageBox.style.display === "") {
        messageBox.style.display = "block";
    } else {
        messageBox.style.display = "none";
    }
}

// Ẩn bảng tin nhắn khi nhấn vào bất kỳ nơi nào khác ngoài bảng tin nhắn
document.addEventListener("click", function(event) {
    const messageBox = document.getElementById("messageBox");
    const messageIcon = document.querySelector(".icon-section img[alt='Message Icon']");

    if (!messageBox.contains(event.target) && event.target !== messageIcon) {
        messageBox.style.display = "none";
    }
});
