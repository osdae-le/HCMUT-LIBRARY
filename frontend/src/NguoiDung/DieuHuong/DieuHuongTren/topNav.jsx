import "./topNav.css";
import MessageReceive from "./message";
import Notification from "./notify";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchResult } from "../../../redux/authSlice";
import { SearchResultsList } from "./SearchResultsList";
function TopNavbar() {
  const [divClass, setDivClass] = useState("");
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const dispatch = useDispatch();
  const bookData = useSelector((state) => state.auth.book?.bookList);
  const toggleDiv = () => {
    const currentClass = divClass;
    if (currentClass.includes("show")) {
      setDivClass("close");
    } else if (currentClass.includes("close")) {
      setDivClass("show");
    } else {
      setDivClass("show");
    }
  };
  let handleOnChangeInput = (value) => {
    setInput(value);
    if (input.length === 0 || input.length === 1) setResults([]);
    else
      setResults(
        bookData.filter((book) =>
          book.bookName.toLowerCase().includes(input.toLowerCase())
        )
      );
  };
  const [noticeClass, setNoticeClass] = useState("");

  const toggleNotice = () => {
    const currentClass = noticeClass;

    if (currentClass.includes("show")) {
      setNoticeClass("close");
    } else if (currentClass.includes("close")) {
      setNoticeClass("show");
    } else {
      setNoticeClass("show");
    }
  };

  return (
    <div className="topNav">
      <div className="right-top-nav">
        <div className="contain-something">
          <div className="empty"></div>
          <div className="contain-search">
            <div className="sub-contain-search">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="sub-contain-search-svg"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(setSearchResult(input));
                  setResults([]);
                }}
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
              <input
                type="text"
                placeholder="Nhập tên sách cần tìm"
                onChange={(e) => {
                  handleOnChangeInput(e.target.value);
                }}
              />
            </div>
          </div>
          <ul className="mail-and-info">
            <li
              className="li-of-mail-bell"
              id="click-on-mail"
              onClick={toggleDiv}
            >
              <div className="mail-and-logo-mail">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="mail-and-bell"
                >
                  <path d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9l.3-.5z" />
                </svg>
              </div>
            </li>
            <li
              className="li-of-mail-bell"
              id="click-on-bell"
              onClick={toggleNotice}
            >
              <div className="mail-and-logo-mail">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="mail-and-bell"
                >
                  <path d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416l400 0c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4l0-25.4c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112l0 25.4c0 47.9 13.9 94.6 39.7 134.6L72.3 368C98.1 328 112 281.3 112 233.4l0-25.4c0-61.9 50.1-112 112-112zm64 352l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z" />
                </svg>
              </div>
            </li>
          </ul>
          <div className="contain-avatar">
            <Link to="information">
              <img
                src={require("./img/image.jpg")}
                alt=""
                className="img-of-contain-avatar"
              />
            </Link>
          </div>
        </div>
        {/* <div className="line"></div> */}
        <SearchResultsList results={results} setResults={setResults} />
      </div>

      <div className={`content-of-mail-inTopNav ${divClass}`}>
        <MessageReceive onClose={toggleDiv} divClass={divClass} />
      </div>
      <div className={`content-of-bell-inTopNav ${noticeClass}`}>
        <Notification onClose={toggleNotice} noticeClass={noticeClass} />
      </div>
    </div>
  );
}

export default TopNavbar;
