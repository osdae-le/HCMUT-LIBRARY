import React from "react";
import "../assets/css/emp_header.css";
import "../assets/css/emp_personalinfo.css";
import avatarImg from "../assets/img/emp_personalinfo_avatarmen.png";
import { useSelector } from "react-redux";
const PersonalInfo = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  return (
    <div className="personal-info-container">
      <div className="personal-info-content">
        <img src={avatarImg} alt="Avatar" className="avatar-img" />
        <h1>{user.name}</h1>
        <p>{user.role}</p>

        <div className="info-details">
          <p>
            <strong>Mã nhân viên:</strong> {user.id}
          </p>
          <p>
            <strong>Họ và tên:</strong> {user.name}
          </p>
          <p>
            <strong>Giới tính:</strong> {user.gender}
          </p>
          <p>
            <strong>Địa chỉ liên lạc:</strong> {user.address}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>SĐT:</strong> {user.phoneNum}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
