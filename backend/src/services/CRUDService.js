import db from "../models/index";
let createNewUser = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.User.create({
        id: Math.floor(Math.random() * (2500000 - 2200000 - 1)) + 2200000 + 1,
        email: "phuongbinh.conan@gmail.com",
        password: "1234",
        name: "Hoang Phuong Binh",
        gender: "Nam",
        address: "Dong Nai",
        phoneNum: "3952587932",
        status: "Normal",
        role: "Student",
      });
      resolve("Successfully created a new user");
    } catch (error) {
      reject(error);
    }
  });
};
let createNewStaff = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.User.create({
        id: Math.floor(Math.random() * (1500000 - 1200000 - 1)) + 1200000 + 1,
        email: "nguyenvana@gmail.com",
        password: "1234",
        name: "Nguyen Van A",
        gender: "Nam",
        address: "Binh Duong",
        phoneNum: "54684965",
        status: "Normal",
        role: "Staff",
      });
      resolve("Successfully created a new user");
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createNewUser: createNewUser,
  createNewStaff: createNewStaff,
};
