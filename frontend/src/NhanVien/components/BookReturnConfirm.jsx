import React, { useState } from "react";
import "../assets/css/emp_bookreturnconfirm.css";
import sidebarIcon from "../assets/img/emp_managedocs_icondanhmuc.svg";

const BookReturnConfirm = () => {
  const [sortStates, setSortStates] = useState([true, true, true]);
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [rows, setRows] = useState([
    {
      cccd: "001282946366",
      bookId: "CH1003",
      bookName: "Hóa đại cương",
      status: "Đúng hạn, nguyên vẹn",
      fine: "0",
      requestStatus: "Đã xử lý",
    },
    {
      cccd: "005225702399",
      bookId: "MT1003",
      bookName: "Giải tích 1",
      status: "Đúng hạn, nguyên vẹn",
      fine: "0",
      requestStatus: "Chưa xử lý",
    },
    {
      cccd: "002301234798",
      bookId: "SP1031",
      bookName: "Triết học Mác - Lênin",
      status: "Trễ 1 ngày, nguyên vẹn",
      fine: "10.000 VND",
      requestStatus: "Chưa xử lý",
    },
    {
      cccd: "001282946366",
      bookId: "PH1003",
      bookName: "Vật lý 1",
      status: "Trễ 7 ngày, nguyên vẹn",
      fine: "50.000 VND",
      requestStatus: "Chưa xử lý",
    },
    {
      cccd: "078901234567",
      bookId: "ME3005",
      bookName: "Thiết kế hệ thống cơ điện tử",
      status: "Đúng hạn, rách bìa",
      fine: "20.000 VND",
      requestStatus: "Chưa xử lý",
    },
    {
      cccd: "090123456789",
      bookId: "TR3077",
      bookName: "Thí nghiệm kỹ thuật hàng không 1",
      status: "Đúng hạn, nguyên vẹn",
      fine: "0",
      requestStatus: "Chưa xử lý",
    },
    {
        cccd: "091343356418",
        bookId: "MT2013",
        bookName: "Xác suất thống kê",
        status: "Đúng hạn, nguyên vẹn",
        fine: "0",
        requestStatus: "Chưa xử lý",
    },
    {
        cccd: "035456789012",
        bookId: "PH1007",
        bookName: "Thí nghiệm vật lý",
        status: "Trễ 7 ngày, nguyên vẹn",
        fine: "50.000 VND",
        requestStatus: "Chưa xử lý",
    },
    {
        cccd: "098765432109",
        bookId: "SP1035",
        bookName: "Chủ nghĩa xã hội khoa học",
        status: "Trễ 3 ngày, nguyên vẹn",
        fine: "30.000 VND",
        requestStatus: "Chưa xử lý",
    },
    {
        cccd: "052345678901",
        bookId: "IM1025",
        bookName: "Quản lý dự án cho kỹ sư",
        status: "Trễ 2 ngày, nguyên vẹn",
        fine: "20.000 VND",
        requestStatus: "Chưa xử lý",
    },
    {
        cccd: "089012302137",
        bookId: "CO2013",
        bookName: "Hệ cơ sở dữ liệu",
        status: "Đúng hạn, nguyên vẹn",
        fine: "0",
        requestStatus: "Chưa xử lý",
    },
    {
        cccd: "098033432346",
        bookId: "CO3001",
        bookName: "Công nghệ phần mềm",
        status: "Đúng hạn, nguyên vẹn",
        fine: "0",
        requestStatus: "Chưa xử lý",
    },






  ]);

  // Hàm lọc dữ liệu theo trạng thái
  const filterTableByStatus = () => {
    if (filterStatus === "Tất cả") return rows;
    return rows.filter((row) =>
      filterStatus === "Đã xử lý"
        ? row.requestStatus === "Đã xử lý"
        : row.requestStatus === "Chưa xử lý"
    );
  };

  // Hàm sắp xếp
  const sortTable = (columnIndex) => {
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
      return sortDirection
        ? cellA.localeCompare(cellB, "vi", { numeric: true })
        : cellB.localeCompare(cellA, "vi", { numeric: true });
    });

    setRows(sortedRows);
  };

  // Hàm xử lý yêu cầu xác nhận trả sách
  const confirmReturn = (index) => {
    const updatedRows = [...rows];
    updatedRows[index].requestStatus = "Đã xử lý";
    setRows(updatedRows);
    alert("Xác nhận trả sách thành công");
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
        <h2>XÁC NHẬN TRẢ SÁCH</h2>

        <div className="return-table-container">
          <table className="return-table" id="return-table">
            <thead>
              <tr>
                <th>
                  CCCD{" "}
                  <span
                    className="filter-icon"
                    onClick={() => sortTable(0)}
                  >
                    🔽
                  </span>
                </th>
                <th>
                  ID sách{" "}
                  <span
                    className="filter-icon"
                    onClick={() => sortTable(1)}
                  >
                    🔽
                  </span>
                </th>
                <th>
                  Tên sách{" "}
                  <span
                    className="filter-icon"
                    onClick={() => sortTable(2)}
                  >
                    🔽
                  </span>
                </th>
                <th>Trạng thái</th>
                <th>Phí phạt</th>
                <th>
                  Xử lý yêu cầu
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="Tất cả">Tất cả</option>
                    <option value="Đã xử lý">Đã xử lý</option>
                    <option value="Chưa xử lý">Xác nhận</option>
                  </select>
                </th>
              </tr>
            </thead>
            <tbody>
              {filterTableByStatus().map((row, index) => (
                <tr key={index}>
                  <td>{row.cccd}</td>
                  <td>{row.bookId}</td>
                  <td>{row.bookName}</td>
                  <td>{row.status}</td>
                  <td>{row.fine}</td>
                  <td className={`status ${row.requestStatus === "Đã xử lý" ? "processed" : "confirm"}`}>
                    {row.requestStatus === "Chưa xử lý" ? (
                      <span
                        className="confirm"
                        onClick={() => confirmReturn(index)}
                      >
                        Xác nhận
                      </span>
                    ) : (
                      "Đã xử lý"
                    )}
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

export default BookReturnConfirm;
