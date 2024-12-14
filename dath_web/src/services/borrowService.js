import axios from "../axios";

// API Thêm eborrow
const createBorrow = (id, listBookId) => {
  return axios.post(`/api/create-eborrow/${id}`, listBookId);
};
const renewBorrow = (borrowData) => {
  return axios.put(`/api/renew`, borrowData);
};
const returnBorrow = (borrowData) => {
  return axios.put(`/api/return`, borrowData);
};
export { createBorrow, renewBorrow, returnBorrow };
