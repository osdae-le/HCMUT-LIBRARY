import React from "react";
import "../assets/css/emp_header.css";
import "../assets/css/emp_personalinfo.css";
import avatarImg from "../assets/img/emp_personalinfo_avatarmen.png";

const PersonalInfo = (props) => {
  const personalDetails = props.passState.user;
  return (
    <div className="personal-info-container">
      <div className="personal-info-content">
        <img src={avatarImg} alt="Avatar" className="avatar-img" />
        <h1>{personalDetails.fullName}</h1>
        <p>{personalDetails.position}</p>

        <div className="info-details">
          <p>
            <strong>Mã nhân viên:</strong> {personalDetails.id}
          </p>
          <p>
            <strong>Họ và tên:</strong> {personalDetails.name}
          </p>
          <p>
            <strong>Giới tính:</strong> {personalDetails.gender}
          </p>
          <p>
            <strong>Địa chỉ liên lạc:</strong> {personalDetails.address}
          </p>
          <p>
            <strong>Email:</strong> {personalDetails.email}
          </p>
          <p>
            <strong>SĐT:</strong> {personalDetails.phoneNum}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
