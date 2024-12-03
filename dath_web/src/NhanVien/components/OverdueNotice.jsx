import React, { useState } from "react";
import "../assets/css/emp_overduenotice.css";
import sidebarIcon from "../assets/img/emp_managedocs_icondanhmuc.svg";

const OverdueNotice = () => {
  const [sortStates, setSortStates] = useState([true, true, true, true, true, true, true]);
  const [rows, setRows] = useState([
    {
        cccd: "079201200124",
        bookId: "MT1003",
        bookName: "Giải tích 1",
        dueDate: "01/03/2024",
        overdueDays: 1,
        fine: "10.000 VNĐ",
        status: "Đã thông báo lần 1",
    },
    {
        cccd: "091343356418",
        bookId: "MT2013",
        bookName: "Xác suất thống kê",
        dueDate: "11/04/2024",
        overdueDays: 1,
        fine: "10.000 VNĐ",
        status: "Đã thông báo lần 1",
    },
    {
        cccd: "035456789012",
        bookId: "PH1007",
        bookName: "Thí nghiệm vật lý",
        dueDate: "01/06/2024",
        overdueDays: 1,
        fine: "10.000 VNĐ",
        status: "Đã thông báo lần 1",
    },
    {
        cccd: "089012345678",
        bookId: "AS3077",
        bookName: "Cơ sở vật lý sợi quang học và ứng dụng",
        dueDate: "28/08/2024",
        overdueDays: 1,
        fine: "10.000 VNĐ",
        status: "Đã thông báo lần 1",
    },
    {
        cccd: "090123456789",
        bookId: "TR3077",
        bookName: "Thí nghiệm kỹ thuật hàng không 1",
        dueDate: "26/12/2024",
        overdueDays: 1,
        fine: "10.000 VNĐ",
        status: "Đã thông báo lần 1",
    },
    {
        cccd: "078901234567",
        bookId: "ME3005",
        bookName: "Thiết kế hệ thống cơ điện tử",
        dueDate: "09/08/2024",
        overdueDays: 1,
        fine: "10.000 VNĐ",
        status: "Đã thông báo lần 1",
    },
    {
        cccd: "063789012345",
        bookId: "CH1003",
        bookName: "Hóa đại cương",
        dueDate: "19/05/2024",
        overdueDays: 2,
        fine: "20.000 VNĐ",
        status: "Đã thông báo lần 1",
    },
    {
        cccd: "098765432109",
        bookId: "SP1035",
        bookName: "Chủ nghĩa xã hội khoa học",
        dueDate: "14/08/2024",
        overdueDays: 5,
        fine: "50.000 VNĐ",
        status: "Đã thông báo lần 1",
    },
    {
        cccd: "052345678901",
        bookId: "IM1025",
        bookName: "Quản lý dự án cho kỹ sư",
        dueDate: "22/09/2024",
        overdueDays: 7,
        fine: "70.000 VNĐ",
        status: "Đã thông báo lần 2",
    },
    {
        cccd: "098033432346",
        bookId: "CO3001",
        bookName: "Công nghệ phần mềm",
        dueDate: "13/09/2024",
        overdueDays: 10,
        fine: "100.000 VNĐ",
        status: "Đã thông báo lần 2",
    },
    {
        cccd: "089012302137",
        bookId: "CO2013",
        bookName: "Hệ cơ sở dữ liệu",
        dueDate: "29/10/2024",
        overdueDays: 15,
        fine: "150.000 VNĐ",
        status: "Đã thông báo lần 2",
    },
    {
        cccd: "093456789012",
        bookId: "EE2009",
        bookName: "Hệ thống máy tính và ngôn ngữ lập trình",
        dueDate: "10/01/2025",
        overdueDays: 20,
        fine: "200.000 VNĐ",
        status: "Đã lập biên bản",
    },
  ]);

  // Hàm sắp xếp bảng
  const sortTable = (columnIndex, isDate = false) => {
    const sortedRows = [...rows];
    const sortDirection = sortStates[columnIndex];
    setSortStates((prev) => {
      const newSortStates = [...prev];
      newSortStates[columnIndex] = !sortDirection;
      return newSortStates;
    });

    sortedRows.sort((a, b) => {
      const cellA = Object.values(a)[columnIndex];
      const cellB = Object.values(b)[columnIndex];
      if (isDate) {
        const dateA = new Date(cellA.split("/").reverse().join("-"));
        const dateB = new Date(cellB.split("/").reverse().join("-"));
        return sortDirection ? dateA - dateB : dateB - dateA;
      }
      return sortDirection
        ? cellA.toString().localeCompare(cellB.toString(), "vi", { numeric: true })
        : cellB.toString().localeCompare(cellA.toString(), "vi", { numeric: true });
    });

    setRows(sortedRows);
  };

  return (
    <div className="main-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h3>
          <img src={sidebarIcon} alt="Danh mục Icon" className="icon" />
          DANH MỤC
        </h3>
        <ul>
          <li>
            <a href="/borrow-register">Đăng ký mượn</a>
          </li>
          <li>
            <a href="/request-extension">Yêu cầu gia hạn</a>
          </li>
          <li>
            <a href="/book-return">Xác nhận trả sách</a>
          </li>
          <li>
            <a href="/overdue-notice">Thông báo quá hạn</a>
          </li>
        </ul>
      </aside>

      {/* Content */}
      <section className="content">
        <h2>THÔNG BÁO QUÁ HẠN</h2>

        <div className="overdue-table-container">
          <table className="overdue-table">
            <thead>
              <tr>
                <th>
                  CCCD{" "}
                  <span className="filter-icon" onClick={() => sortTable(0)}>
                    🔽
                  </span>
                </th>
                <th>
                  ID sách{" "}
                  <span className="filter-icon" onClick={() => sortTable(1)}>
                    🔽
                  </span>
                </th>
                <th>
                  Tên sách{" "}
                  <span className="filter-icon" onClick={() => sortTable(2)}>
                    🔽
                  </span>
                </th>
                <th>
                  Ngày hẹn trả{" "}
                  <span className="filter-icon" onClick={() => sortTable(3, true)}>
                    🔽
                  </span>
                </th>
                <th>
                  Số ngày quá hạn{" "}
                  <span className="filter-icon" onClick={() => sortTable(4)}>
                    🔽
                  </span>
                </th>
                <th>
                  Phí phạt{" "}
                  <span className="filter-icon" onClick={() => sortTable(5)}>
                    🔽
                  </span>
                </th>
                <th>
                  Trạng thái{" "}
                  <span className="filter-icon" onClick={() => sortTable(6)}>
                    🔽
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => (
                    <tr key={index}>
                    <td>{row.cccd}</td>
                    <td>{row.bookId}</td>
                    <td>{row.bookName}</td>
                    <td>{row.dueDate}</td>
                    <td>{row.overdueDays}</td>
                    <td>{row.fine}</td>
                    <td
                        className={row.status === "Đã lập biên bản" ? "bold-red-text" : ""}
                    >
                        {row.status}
                    </td>
                    </tr>
                ))}
            </tbody>

          </table>
        </div>
      </section>
    </div>
  );
};

export default OverdueNotice;
