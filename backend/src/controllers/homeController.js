import CRUDService from "../services/CRUDService";
let getHomePage = (req, res) => {
  return res.send("Hello world");
};
let createNewUser = async (req, res) => {
  let message = await CRUDService.createNewUser();
  return res.send(message);
};
let createNewStaff = async (req, res) => {
  let message = await CRUDService.createNewStaff();
  return res.send(message);
};

module.exports = {
  getHomePage: getHomePage,
  createNewUser: createNewUser,
  createNewStaff: createNewStaff,

};
