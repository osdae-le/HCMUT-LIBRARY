import axios from "../axios";
const handleLogin = (email, password) => {
  return axios.post("/api/login", { email, password });
};
const getAllBooks = () => {
  return axios.get("api/get-all-books");
};
export { handleLogin, getAllBooks };
