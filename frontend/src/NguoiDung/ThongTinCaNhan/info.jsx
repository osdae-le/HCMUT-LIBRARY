import "./info.css";

function InfoUser(props) {
  let userData = props.getStateFromParent();
  userData = userData.user;
  return (
    <>
      <div className="right-under-nav">
        <div className="empty"></div>
        <div className="full-box-info">
          <div className="edit-info-fullbox">
            <div className="box-editProfile">
              <h6 className="box-editProfile-title">
                Chỉnh sửa thông tin cá nhân
              </h6>
              <table className="box-editProfile-table">
                <tbody className="box-editProfile-body">
                  <tr className="box-editProfile-row box-editProfile-row2td">
                    <td
                      className="box-editProfile-cl1
                                        box-editProfile-cl"
                    >
                      Họ
                    </td>
                    <td
                      className="box-editProfile-cl2
                                        box-editProfile-cl"
                    >
                      Tên
                    </td>
                  </tr>
                  <tr className="box-editProfile-row box-editProfile-row2td">
                    <td
                      className="box-editProfile-cl1
                                        box-editProfile-cl"
                    >
                      <input type="text" placeholder="Họ" />
                    </td>
                    <td
                      className="box-editProfile-cl2
                                        box-editProfile-cl"
                    >
                      <input type="text" placeholder="Tên" />
                    </td>
                  </tr>
                  <tr className="box-editProfile-row">
                    <td className="box-editProfile-cl">Số điện thoại</td>
                  </tr>
                  <tr className="box-editProfile-row">
                    <td className="box-editProfile-cl">
                      <input
                        type="text"
                        placeholder="Số điện thoại"
                        className="box-editProfile-onetd"
                      />
                    </td>
                  </tr>
                  <tr className="box-editProfile-row">
                    <td className="box-editProfile-cl">Email</td>
                  </tr>
                  <tr className="box-editProfile-row">
                    <td className="box-editProfile-cl">
                      <input
                        type="text"
                        placeholder="Nhập email"
                        className="box-editProfile-onetd"
                      />
                    </td>
                  </tr>
                  <tr className="box-editProfile-row">
                    <td className="box-editProfile-cl">Ngày sinh</td>
                  </tr>
                  <tr className="box-editProfile-row">
                    <td className="box-editProfile-cl">
                      <input type="date" className="box-editProfile-onetd" />
                    </td>
                  </tr>
                  <tr className="box-editProfile-row">
                    <td className="box-editProfile-cl">Địa chỉ</td>
                  </tr>
                  <tr className="box-editProfile-row">
                    <td className="box-editProfile-cl">
                      <textarea
                        className="box-editProfile-address"
                        placeholder="Nhập địa chỉ"
                      ></textarea>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button className="box-editProfile-change">Cập nhật</button>
            </div>
          </div>
          <div className="information-fullBox">
            <div className="information-Box">
              <div className="infoBox-avatar">
                <img
                  src={require("./img/image.jpg")}
                  alt=""
                  className="infoBox-avatar_avatar"
                />
              </div>
              <div className="infoBox-about">
                <h6 className="infoBox-about-title">Thông tin cá nhân</h6>
                <ul className="infoBox-about-list">
                  <li className="infoBox-about-list-li">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="infoBox-list-li-svg"
                    >
                      <path d="M406.5 399.6C387.4 352.9 341.5 320 288 320l-64 0c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3l64 0c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z" />
                    </svg>
                    Họ tên: {userData.name}
                  </li>
                  <li className="infoBox-about-list-li">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="infoBox-list-li-svg"
                    >
                      <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                    </svg>
                    Số điện thoại: {userData.phoneNum}
                  </li>
                  <li className="infoBox-about-list-li">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="infoBox-list-li-svg"
                    >
                      <path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376l0 103.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z" />
                    </svg>
                    Email: {userData.email}
                  </li>
                  <li className="infoBox-about-list-li">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="infoBox-list-li-svg"
                    >
                      <path d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z" />
                    </svg>
                    Giới tính: {userData.gender}
                  </li>
                  <li className="infoBox-about-list-li">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="infoBox-list-li-svg"
                    >
                      <path d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32L0 64 0 368 0 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30l0-247.7c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48l0-16z" />
                    </svg>
                    Địa chỉ: {userData.address}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InfoUser;
