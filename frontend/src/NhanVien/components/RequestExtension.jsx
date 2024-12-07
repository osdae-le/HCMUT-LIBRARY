import React, { useState } from "react";
import "../assets/css/emp_requestextension.css";
import sidebarIcon from "../assets/img/emp_managedocs_icondanhmuc.svg";

const RequestExtension = () => {
  const [sortStates, setSortStates] = useState([true, true, true, true, true]);
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [rows, setRows] = useState([
    {
      cccd: "079201200124",
      bookId: "MT1003",
      bookName: "Giải tích 1",
      initialReturnDate: "05/02/2024",
      extendedReturnDate: "01/03/2024",
      status: "Đã xử lý",
    },
    {
      cccd: "091343356418",
      bookId: "MT2013",
      bookName: "Xác suất thống kê",
      initialReturnDate: "12/03/2024",
      extendedReturnDate: "11/04/2024",
      status: "Chưa xử lý",
    },
    {
      cccd: "063789012345",
      bookId: "CH1003",
      bookName: "Hóa đại cương",
      initialReturnDate: "20/04/2024",
      extendedReturnDate: "19/05/2024",
      status: "Chưa xử lý",
    },
    {
      cccd: "035456789012",
      bookId: "PH1007",
      bookName: "Thí nghiệm vật lý",
      initialReturnDate: "03/05/2024",
      extendedReturnDate: "01/06/2024",
      status: "Chưa xử lý",
    },
    {
      cccd: "098765432109",
      bookId: "SP1035",
      bookName: "Chủ nghĩa xã hội khoa học",
      initialReturnDate: "11/06/2024",
      extendedReturnDate: "14/08/2024",
      status: "Đã xử lý",
    },
    {
        cccd: "052345678901",
        bookId: "IM1025",
        bookName: "Quản lý dự án cho kỹ sư",
        initialReturnDate: "23/08/2024",
        extendedReturnDate: "22/09/2024",
        status: "Chưa xử lý",
    },
    {
        cccd: "089012302137",
        bookId: "CO2013",
        bookName: "Hệ cơ sở dữ liệu",
        initialReturnDate: "30/09/2024",
        extendedReturnDate: "29/10/2024",
        status: "Chưa xử lý",
    },
    {
        cccd: "098033432346",
        bookId: "CO3001",
        bookName: "Công nghệ phần mềm",
        initialReturnDate: "15/07/2024",
        extendedReturnDate: "13/09/2024",
        status: "Đã xử lý",
    },
    {
        cccd: "089012345678",
        bookId: "AS3077",
        bookName: "Cơ sở vật lý sợi quang học và ứng dụng",
        initialReturnDate: "18/08/2024",
        extendedReturnDate: "28/08/2024",
        status: "Chưa xử lý",
    },
    {
        cccd: "090123456789",
        bookId: "TR3077",
        bookName: "Thí nghiệm kỹ thuật hàng không 1",
        initialReturnDate: "14/12/2024",
        extendedReturnDate: "26/12/2024",
        status: "Chưa xử lý",
    },
    {
        cccd: "078901234567",
        bookId: "ME3005",
        bookName: "Thiết kế hệ thống cơ điện tử",
        initialReturnDate: "10/07/2024",
        extendedReturnDate: "09/08/2024",
        status: "Chưa xử lý",
    },
    {
        cccd: "093456789012",
        bookId: "EE2009",
        bookName: "Hệ thống máy tính và ngôn ngữ lập trình",
        initialReturnDate: "06/12/2024",
        extendedReturnDate: "10/01/2025",
        status: "Chưa xử lý",
    },

  ]);

  // Hàm sắp xếp
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
      } else {
        return sortDirection
          ? cellA.localeCompare(cellB, "vi", { numeric: true })
          : cellB.localeCompare(cellA, "vi", { numeric: true });
      }
    });

    setRows(sortedRows);
  };

  // Hàm lọc trạng thái
  const filterTableByStatus = () => {
    if (filterStatus === "Tất cả") return rows;
    return rows.filter((row) =>
      filterStatus === "Đã xử lý"
        ? row.status === "Đã xử lý"
        : row.status === "Chưa xử lý"
    );
  };

  // Xử lý yêu cầu duyệt/từ chối
  const processRequest = (index, action) => {
    const updatedRows = [...rows];
    updatedRows[index].status = "Đã xử lý";
    setRows(updatedRows);
    alert(
      action === "approve"
        ? "Yêu cầu gia hạn đã được duyệt"
        : "Yêu cầu gia hạn bị từ chối"
    );
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
        <h2>YÊU CẦU GIA HẠN</h2>

        <div className="loan-table-container">
          <table className="loan-table" id="loan-table">
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
                <th>
                  Ngày hẹn trả ban đầu{" "}
                  <span
                    className="filter-icon"
                    onClick={() => sortTable(3, true)}
                  >
                    🔽
                  </span>
                </th>
                <th>
                  Ngày hẹn trả gia hạn{" "}
                  <span
                    className="filter-icon"
                    onClick={() => sortTable(4, true)}
                  >
                    🔽
                  </span>
                </th>
                <th>
                  Xử lý yêu cầu
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="Tất cả">Tất cả</option>
                    <option value="Đã xử lý">Đã xử lý</option>
                    <option value="Duyệt | Từ chối">Chưa xử lý</option>
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
                  <td>{row.initialReturnDate}</td>
                  <td>{row.extendedReturnDate}</td>
                  <td className={`status ${row.status === "Đã xử lý" ? "processed" : "approved-rejected"}`}>
                    {row.status === "Chưa xử lý" ? (
                      <>
                        <span
                          className="approve"
                          onClick={() => processRequest(index, "approve")}
                        >
                          Duyệt
                        </span>{" "}
                        |{" "}
                        <span
                          className="reject"
                          onClick={() => processRequest(index, "reject")}
                        >
                          Từ chối
                        </span>
                      </>
                    ) : (
                      row.status
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

export default RequestExtension;
