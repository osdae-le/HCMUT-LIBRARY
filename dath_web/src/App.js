import LoginInterface from "./DangNhap/login.jsx";
import LeftNavbar from "./NguoiDung/DieuHuong/DieuHuongTrai/leftNav.jsx";
import TopNavbar from "./NguoiDung/DieuHuong/DieuHuongTren/topNav.jsx";
import HomepageUser from "./NguoiDung/TrangChuNguoiDung/homepage.jsx";
import RegistBorrowBook from "./NguoiDung/DangKyMuon/regist.jsx";
import HistoryBookBorrow from "./NguoiDung/LichSuMuonSach/history.jsx";
import BorrowBook from "./NguoiDung/MuonSach/borrow.jsx";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setBookList,
  setSearchResult,
  clearSearchResult,
} from "./redux/authSlice.js";
import { getAllBooks } from "./services/userService.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";
import InfoUser from "./NguoiDung/ThongTinCaNhan/info.jsx";

//Nhan vien
import Header from "./NhanVien/components/Header.jsx";
import HomePage from "./NhanVien/components/HomePage.jsx";
import ManageDocs from "./NhanVien/components/ManageDocs.jsx";
import DocsDetail from "./NhanVien/components/DocsDetail.jsx";
import AddDocument from "./NhanVien/components/AddDocument.jsx";
import BorrowRegister from "./NhanVien/components/BorrowRegister.jsx";
import RequestExtension from "./NhanVien/components/RequestExtension.jsx";
import BookReturnConfirm from "./NhanVien/components/BookReturnConfirm.jsx";
import OverdueNotice from "./NhanVien/components/OverdueNotice.jsx";
import PersonalInfo from "./NhanVien/components/PersonalInfo.jsx";

function User() {
  const location = useLocation();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    // Hàm bất đồng bộ để lấy dữ liệu
    const fetchData = async () => {
      try {
        const books = await getAllBooks(); // Gọi API
        dispatch(setBookList(books.books)); // Lưu dữ liệu vào state
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setLoading(false); // Tắt trạng thái loading
      }
    };
    fetchData(); // Gọi hàm
  }, []);

  //Các route cần ẩn Navbar
  const hideNavbarRoutes = ["/login", "/logout"];

  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);
  return (
    <>
      {/* <LoginInterface/> */}
      <Routes>
        {/* <Route
          path="/"
          element={
            state.isLoggedIn ? (
              <Navigate to="/homepage" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        /> */}
        <Route path="/" exact element={<HomepageUser />} />
      </Routes>
      {shouldShowNavbar && <LeftNavbar />}
      {shouldShowNavbar && <TopNavbar />}
      <Routes>
        <Route path="/regist" element={<RegistBorrowBook />} />
        <Route path="/history" element={<HistoryBookBorrow />} />
        <Route path="/borrow" element={<BorrowBook />} />
        <Route path="/information" element={<InfoUser />} />
      </Routes>
    </>
  );
}

function Employee() {
  return (
    <>
      <Header /> {/* Header luôn hiển thị trên mọi trang */}
      <Routes>
        {/* Định nghĩa đường dẫn gốc hiển thị trang chủ */}
        <Route path="/" exact element={<HomePage />} />
        <Route path="/manage-docs" element={<ManageDocs />} />
        <Route path="/docs-detail" element={<DocsDetail />} />
        <Route path="/add-document" element={<AddDocument />} />

        <Route path="/borrow-register" element={<BorrowRegister />} />
        <Route path="/request-extension" element={<RequestExtension />} />
        <Route path="/book-return" element={<BookReturnConfirm />} />
        <Route path="/overdue-notice" element={<OverdueNotice />} />

        <Route path="/personal-info" element={<PersonalInfo />} />
      </Routes>
    </>
  );
}

function App() {
  const user = useSelector((state) => state.auth.login?.currentUser);
  console.log("User: ", user);
  return (
    <Router>
      {user && user.role === "Student" && <User />}
      {user && user.role === "Staff" && <Employee />}
      {!user && <LoginInterface />}
    </Router>
  );
}

export default App;
