import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
    book: {
      bookList: [],
      searchResult: "",
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
    },
    loginFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    setBookList: (state, action) => {
      state.book.bookList = action.payload;
    },
    setSearchResult: (state, action) => {
      state.book.searchResult = action.payload;
    },
    clearSearchResult: (state) => {
      state.book.searchResult = "";
    },
    logOutSuccess: (state) => {
      state.login.isFetching = false;
      state.login.currentUser = null;
      state.login.error = false;
      state.book.bookList = [];
      state.book.borrowBook = [];
    },
    logOutFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    logOutStart: (state) => {
      state.login.isFetching = true;
    },
  },
});

export const {
  loginStart,
  loginFailed,
  loginSuccess,
  setBookList,
  setSearchResult,
  clearSearchResult,
  logOutStart,
  logOutSuccess,
  logOutFailed,
} = authSlice.actions;

export default authSlice.reducer;
