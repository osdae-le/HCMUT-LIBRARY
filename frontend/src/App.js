import LoginInterface from "./DangNhap/login.jsx";
import LeftNavbar from "./NguoiDung/DieuHuong/DieuHuongTrai/leftNav.jsx";
import TopNavbar from "./NguoiDung/DieuHuong/DieuHuongTren/topNav.jsx";
import HomepageUser from "./NguoiDung/TrangChuNguoiDung/homepage.jsx";
import RegistBorrowBook from "./NguoiDung/DangKyMuon/regist.jsx";
import HistoryBookBorrow from "./NguoiDung/LichSuMuonSach/history.jsx";
import BorrowBook from "./NguoiDung/MuonSach/borrow.jsx";
import React, { useRef, useState } from "react";
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

function User(props) {
  const location = useLocation();

  // Các route cần ẩn Navbar
  const hideNavbarRoutes = ["/login", "/logout"];

  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);
  const [state, setState] = useState(props.getStateFromParent);
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
        <Route
          path="/"
          exact
          element={state.isLoggedIn ? <HomepageUser /> : <LoginInterface />}
        />
      </Routes>
      {shouldShowNavbar && <LeftNavbar setStateLogOut={props.setStateLogOut} />}
      {shouldShowNavbar && <TopNavbar />}
      {shouldShowNavbar && <HomepageUser />}
      <Routes>
        <Route path="/regist" element={<RegistBorrowBook getStateFromParent={props.getStateFromParent} />} />
        <Route path="/history" element={<HistoryBookBorrow getStateFromParent={props.getStateFromParent} />} />
        <Route path="/borrow" element={<BorrowBook getStateFromParent={props.getStateFromParent} />} />
        <Route
          path="/information"
          element={<InfoUser getStateFromParent={props.getStateFromParent} />}
        />
      </Routes>
    </>
  );
}

function Employee(props) {
  const [state, setState] = useState(props.getStateFromParent);
  return (
    <>
      <Header passState={state} setStateLogOut={props.setStateLogOut} />{" "}
      {/* Header luôn hiển thị trên mọi trang */}
      <Routes>
        {/* Định nghĩa đường dẫn gốc hiển thị trang chủ */}
        <Route
          path="/"
          exact
          element={state.isLoggedIn ? <HomePage /> : <LoginInterface />}
        />
        <Route path="/manage-docs" element={<ManageDocs />} />
        <Route path="/docs-detail" element={<DocsDetail />} />
        <Route path="/add-document" element={<AddDocument />} />

        <Route path="/borrow-register" element={<BorrowRegister />} />
        <Route path="/request-extension" element={<RequestExtension />} />
        <Route path="/book-return" element={<BookReturnConfirm />} />
        <Route path="/overdue-notice" element={<OverdueNotice />} />

        <Route
          path="/personal-info"
          element={<PersonalInfo passState={state} />}
        />
      </Routes>
    </>
  );
}

function App() {
  const [state, setState] = useState({
    user: null,
    isLoggedIn: false,
  });
  function loginSuccess(data) {
    console.log(data);
    setState({
      user: data,
      isLoggedIn: true,
    });
  }
  function getStateFromParent() {
    return state;
  }
  function setStateLogOut() {
    setState({
      user: null,
      isLoggedIn: false,
    });
  }
  return (
    <Router>
      {state.isLoggedIn && state.user.role === "Student" && (
        <User
          getStateFromParent={getStateFromParent}
          setStateLogOut={setStateLogOut}
        />
      )}
      {state.isLoggedIn && state.user.role === "Staff" && (
        <Employee
          getStateFromParent={getStateFromParent}
          setStateLogOut={setStateLogOut}
        />
      )}
      {!state.isLoggedIn && <LoginInterface loginSuccess={loginSuccess} />}
    </Router>
  );
}

export default App;
