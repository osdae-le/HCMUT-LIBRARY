import axios from "../axios";
const handleLogin = (email, password) => {
  return axios.post("/api/login", { email, password });
};
const getAllBooks = () => {
  return axios.get("api/get-all-books");
};
const getAllBorrow = (id) => {
  return axios.get(`api/get-all-borrow/${id}`);
};
const getAllHistory = (id) => {
  return axios.get(`api/get-all-history/${id}`);
};
export { handleLogin, getAllBooks, getAllBorrow, getAllHistory };
