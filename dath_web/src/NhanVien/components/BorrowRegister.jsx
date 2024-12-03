import React, { useState } from "react";
import "../assets/css/emp_header.css";
import "../assets/css/emp_borrow_register.css";
import sidebarIcon from "../assets/img/emp_managedocs_icondanhmuc.svg";

const BorrowRegister = () => {
  const [sortStates, setSortStates] = useState([true, true, true, true, true]); 
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [requests, setRequests] = useState([
    { cccd: "079201200124", id: "MT1003", book: "Giải tích 1", requestDate: "05/02/2024", dueDate: "01/03/2024", status: "Đã xử lý" },
    { cccd: "091343356418", id: "MT2013", book: "Xác suất thống kê", requestDate: "12/03/2024", dueDate: "11/04/2024", status: "Duyệt | Từ chối" },
    { cccd: "063789012345", id: "CH1003", book: "Hóa đại cương", requestDate: "20/04/2024", dueDate: "19/05/2024", status: "Duyệt | Từ chối" },
    { cccd: "035456789012", id: "PH1007", book: "Thí nghiệm vật lý", requestDate: "03/05/2024", dueDate: "01/06/2024", status: "Duyệt | Từ chối" },
    { cccd: "098765432109", id: "SP1035", book: "Chủ nghĩa xã hội khoa học", requestDate: "11/06/2024", dueDate: "14/08/2024", status: "Đã xử lý" },
    { cccd: "052345678901", id: "IM1025", book: "Quản lý dự án cho kỹ sư", requestDate: "23/08/2024", dueDate: "22/09/2024", status: "Duyệt | Từ chối" },
    { cccd: "089012302137", id: "CO2013", book: "Hệ cơ sở dữ liệu", requestDate: "30/09/2024", dueDate: "29/10/2024", status: "Duyệt | Từ chối" },
    { cccd: "098033432346", id: "CO3001", book: "Công nghệ phần mềm", requestDate: "15/07/2024", dueDate: "13/09/2024", status: "Đã xử lý" },
    { cccd: "089012345678", id: "AS3077", book: "Cơ sở vật lý sợi quang học và ứng dụng", requestDate: "18/08/2024", dueDate: "28/08/2024", status: "Duyệt | Từ chối" },
    { cccd: "090123456789", id: "TR3077", book: "Thí nghiệm kỹ thuật hàng không 1", requestDate: "14/12/2024", dueDate: "26/12/2024", status: "Duyệt | Từ chối" },
    { cccd: "078901234567", id: "ME3005", book: "Thiết kế hệ thống cơ điện tử", requestDate: "10/07/2024", dueDate: "09/08/2024", status: "Duyệt | Từ chối" },
    { cccd: "093456789012", id: "EE2009", book: "Hệ thống máy tính và ngôn ngữ lập trình", requestDate: "06/12/2024", dueDate: "10/01/2025", status: "Duyệt | Từ chối" },
  ]);

  // Hàm lọc trạng thái
  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  // Lọc danh sách dựa trên trạng thái
  const filteredRequests = requests.filter((req) => {
    if (filterStatus === "Tất cả") return true;
    if (filterStatus === "Đã xử lý" && req.status === "Đã xử lý") return true;
    if (filterStatus === "Duyệt | Từ chối" && req.status === "Duyệt | Từ chối") return true;
    return false;
  });

  // Hàm sắp xếp
  const sortTable = (columnIndex, isDate = false) => {
    const newSortStates = [...sortStates];
    newSortStates[columnIndex] = !newSortStates[columnIndex];
    setSortStates(newSortStates);

    const sortedRequests = [...filteredRequests].sort((a, b) => {
      const valueA = Object.values(a)[columnIndex];
      const valueB = Object.values(b)[columnIndex];

      if (isDate) {
        const dateA = new Date(valueA.split("/").reverse().join("-"));
        const dateB = new Date(valueB.split("/").reverse().join("-"));
        return newSortStates[columnIndex] ? dateA - dateB : dateB - dateA;
      }
      return newSortStates[columnIndex]
        ? valueA.localeCompare(valueB, "vi", { numeric: true })
        : valueB.localeCompare(valueA, "vi", { numeric: true });
    });

    setRequests(sortedRequests);
  };

  // Xử lý yêu cầu "Duyệt" hoặc "Từ chối"
  const processRequest = (index, action) => {
    const updatedRequests = [...requests];
    updatedRequests[index].status = "Đã xử lý";
    alert(action === "approve" ? "Đăng ký mượn đã được duyệt thành công" : "Đăng ký mượn bị từ chối");
    setRequests(updatedRequests);
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
          <li><a href="/borrow-register">Đăng ký mượn</a></li>
          <li><a href="/request-extension">Yêu cầu gia hạn</a></li>
          <li><a href="/book-return">Xác nhận trả sách</a></li>
          <li><a href="/overdue-notice">Thông báo quá hạn</a></li>
        </ul>
      </aside>

      {/* Content */}
      <section className="content">
        <h2>ĐĂNG KÝ MƯỢN</h2>

        {/* Table */}
        <div className="loan-table-container">
          <table className="loan-table">
            <thead>
              <tr>
                <th>
                  CCCD <span className="filter-icon" onClick={() => sortTable(0)}>🔽</span>
                </th>
                <th>
                  ID sách <span className="filter-icon" onClick={() => sortTable(1)}>🔽</span>
                </th>
                <th>
                  Tên sách <span className="filter-icon" onClick={() => sortTable(2)}>🔽</span>
                </th>
                <th>
                  Ngày yêu cầu <span className="filter-icon" onClick={() => sortTable(3, true)}>🔽</span>
                </th>
                <th>
                  Ngày hẹn trả <span className="filter-icon" onClick={() => sortTable(4, true)}>🔽</span>
                </th>
                <th>
                  Xử lý yêu cầu
                  <select id="filterStatus" onChange={handleFilterChange}>
                    <option value="Tất cả">Tất cả</option>
                    <option value="Đã xử lý">Đã xử lý</option>
                    <option value="Duyệt | Từ chối">Chưa xử lý</option>
                  </select>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((req, index) => (
                <tr key={index}>
                  <td>{req.cccd}</td>
                  <td>{req.id}</td>
                  <td>{req.book}</td>
                  <td>{req.requestDate}</td>
                  <td>{req.dueDate}</td>
                  <td className={`status ${req.status === "Đã xử lý" ? "processed" : "approved-rejected"}`}>
                    {req.status === "Đã xử lý" ? (
                      req.status
                    ) : (
                      <>
                        <span className="approve" onClick={() => processRequest(index, "approve")}>
                          Duyệt
                        </span>{" "}
                        |{" "}
                        <span className="reject" onClick={() => processRequest(index, "reject")}>
                          Từ chối
                        </span>
                      </>
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

export default BorrowRegister;
