const useLogout = () => {
    const logout = () => {
      alert("Đăng xuất thành công");
      window.location.href = "/logout"; // Thay bằng navigate nếu cần
    };
  
    return { logout };
  };
  
  export default useLogout;
  