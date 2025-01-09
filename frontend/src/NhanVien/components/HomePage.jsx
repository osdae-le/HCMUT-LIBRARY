import React from "react";
import "../assets/css/emp_homepage.css";
import homepageImg from "../assets/img/emp_homepage.svg";
import Header from "./Header";

const HomePage = () => {
  return (
    <>
      {/* Header */}

      {/* Hình ảnh chính của trang chủ */}
      <div className="homepage-image">
        <img
          src={homepageImg}
          alt="Trường Đại Học Bách Khoa"
          className="main-image"
        />
      </div>
    </>
  );
};

export default HomePage;
