import axios from "../axios";

// API Thêm eborrow
const createBorrow = (id, listBookId) => {
  return axios.post(`/api/create-eborrow/${id}`, listBookId);
};

export { createBorrow, };
