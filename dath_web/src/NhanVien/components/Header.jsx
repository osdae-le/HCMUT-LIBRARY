import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/emp_header.css";
import logo from "../assets/img/emp_header_logoBK.png";
import notifyIcon from "../assets/img/emp_header_notify.svg";
import messageIcon from "../assets/img/emp_header_message.svg";
import avatar from "../assets/img/emp_header_avatar.svg";
import user1 from "../assets/img/emp_HIEUTHUHAI.jpg";
import user2 from "../assets/img/emp_negav.webp";
import user3 from "../assets/img/emp_hurrykng.webp";
import user4 from "../assets/img/emp_manbo.webp";
import user5 from "../assets/img/emp_kewtiie.webp";

const Header = (props) => {
  const navigate = useNavigate();

  const [notificationVisible, setNotificationVisible] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const notifications = [
    "Bạn đã đăng nhập vào 11:05 15/11/2024",
    "Bạn đã đăng nhập vào 08:30 14/11/2024",
    "Bạn đã đăng nhập vào 15:45 13/11/2024",
  ];

  const toggleNotification = () => setNotificationVisible(!notificationVisible);
  const toggleMessageBox = () => setMessageVisible(!messageVisible);
  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  const handleNavigation = (path) => {
    navigate(path);
    setDropdownVisible(false);
  };
  return (
    <div className="header-content">
      {/* Logo Section */}
      <a href="/" className="logo-link">
        {" "}
        {/* Tải lại trang khi nhấn vào logo */}
        <div className="logo-section">
          <img src={logo} alt="Logo BK" className="logo" />
          <div>
            <h1>THƯ VIỆN</h1>
            <span>TRƯỜNG ĐẠI HỌC BÁCH KHOA - HCMUT</span>
          </div>
        </div>
      </a>

      {/* Navigation Section */}
      <nav className="nav-section">
        <a
          href="/"
          onClick={(e) => e.preventDefault() || handleNavigation("/")}
        >
          TRANG CHỦ
        </a>
        <a
          href="/manage-docs"
          onClick={(e) =>
            e.preventDefault() || handleNavigation("/manage-docs")
          }
        >
          QUẢN LÝ TÀI LIỆU
        </a>
        <a
          href="/borrow-register"
          onClick={(e) =>
            e.preventDefault() || handleNavigation("/borrow-register")
          }
        >
          QUẢN LÝ MƯỢN TRẢ
        </a>
        <a
          href="/personal-info"
          onClick={(e) =>
            e.preventDefault() || handleNavigation("/personal-info")
          }
        >
          THÔNG TIN CÁ NHÂN
        </a>
      </nav>

      {/* Icon Section */}
      <div className="icon-section">
        {/* Notification Icon */}
        <img
          src={notifyIcon}
          alt="Notify Icon"
          className="icon"
          onClick={toggleNotification}
        />
        {notificationVisible && (
          <div className="notification-box">
            <ul>
              {notifications.map((notification, index) => (
                <li key={index}>{notification}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Message Icon */}
        <img
          src={messageIcon}
          alt="Message Icon"
          className="icon"
          onClick={toggleMessageBox}
        />
        {messageVisible && (
          <div className="message-box">
            <div className="message-header">Đoạn chat</div>
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="search-bar"
            />
            <div className="message-content">
              {[user1, user2, user3, user4, user5].map((user, index) => (
                <div className="message-item" key={index}>
                  <img
                    src={user}
                    alt={`User ${index + 1}`}
                    className="message-avatar"
                  />
                  <div className="message-text">
                    <strong>{`User ${index + 1}`}</strong>
                    <p>Đoạn chat gần đây...</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Avatar Section */}
        <div className="avatar-container">
          <img
            src={avatar}
            alt="Avatar"
            className="icon avatar"
            onClick={toggleDropdown}
          />
          {dropdownVisible && (
            <div className="dropdown">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation("/personal-info");
                }}
              >
                Thông tin cá nhân
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation("/");
                  props.setStateLogOut();
                }}
              >
                Đăng xuất
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
