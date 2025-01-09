import "./leftNav.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOutSuccess } from "../../../redux/authSlice";
function LeftNavbar() {
  const dispatch = useDispatch();
  return (
    <>
      <div className="left-nav-contain-navi">
        <div className="logo_BK">
          <img
            src={require("./img/hcmut.png")}
            alt=""
            className="logo_bk_img"
          />
          <p>Thư viện</p>
        </div>
        <ul className="navigation">
          <li>
            <Link to="" className="nav_with_link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                className="logo-each-navi"
              >
                <path d="M249.6 471.5c10.8 3.8 22.4-4.1 22.4-15.5l0-377.4c0-4.2-1.6-8.4-5-11C247.4 52 202.4 32 144 32C93.5 32 46.3 45.3 18.1 56.1C6.8 60.5 0 71.7 0 83.8L0 454.1c0 11.9 12.8 20.2 24.1 16.5C55.6 460.1 105.5 448 144 448c33.9 0 79 14 105.6 23.5zm76.8 0C353 462 398.1 448 432 448c38.5 0 88.4 12.1 119.9 22.6c11.3 3.8 24.1-4.6 24.1-16.5l0-370.3c0-12.1-6.8-23.3-18.1-27.6C529.7 45.3 482.5 32 432 32c-58.4 0-103.4 20-123 35.6c-3.3 2.6-5 6.8-5 11L304 456c0 11.4 11.7 19.3 22.4 15.5z" />
              </svg>
              Trang chủ thư viện
            </Link>
          </li>
          <li>
            <Link to="regist" className="nav_with_link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                className="logo-each-navi"
              >
                <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM625 177L497 305c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L591 143c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
              </svg>
              Đăng ký mượn
            </Link>
          </li>
          <li>
            <Link to="history" className="nav_with_link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="logo-each-navi"
              >
                <path d="M432 64L208 64c-8.8 0-16 7.2-16 16l0 16-64 0 0-16c0-44.2 35.8-80 80-80L432 0c44.2 0 80 35.8 80 80l0 224c0 44.2-35.8 80-80 80l-16 0 0-64 16 0c8.8 0 16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zM0 192c0-35.3 28.7-64 64-64l256 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 192zm64 32c0 17.7 14.3 32 32 32l192 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 192c-17.7 0-32 14.3-32 32z" />
              </svg>
              Lịch sử mượn sách
            </Link>
          </li>
          <li>
            <Link to="borrow" className="nav_with_link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="logo-each-navi"
              >
                <path d="M160 96a96 96 0 1 1 192 0A96 96 0 1 1 160 96zm80 152l0 264-48.4-24.2c-20.9-10.4-43.5-17-66.8-19.3l-96-9.6C12.5 457.2 0 443.5 0 427L0 224c0-17.7 14.3-32 32-32l30.3 0c63.6 0 125.6 19.6 177.7 56zm32 264l0-264c52.1-36.4 114.1-56 177.7-56l30.3 0c17.7 0 32 14.3 32 32l0 203c0 16.4-12.5 30.2-28.8 31.8l-96 9.6c-23.2 2.3-45.9 8.9-66.8 19.3L272 512z" />
              </svg>
              Sách đang mượn
            </Link>
          </li>
        </ul>
        <div
          className="contain_log_out"
          onClick={() => {
            dispatch(logOutSuccess());
          }}
        >
          <Link to="/" className="log-out">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="logo-each-navi"
            >
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
            </svg>
            Đăng xuất
          </Link>
        </div>
      </div>
    </>
  );
}

export default LeftNavbar;
