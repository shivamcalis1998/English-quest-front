import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  BOOKS_GET,
  BOOKS_POST,
  BOOKS_PUT,
  BOOKS_DELETE,
  LOGIN_FAIL,
} from "./actionTypes";

import axios from "axios";

export const signup = (data) => async (dispatch) => {
  try {
    await axios.post(`https://english-quest-back.onrender.com/signup`, data);
  } catch (error) {
    console.log(error);
  }
};

export const login = (data) => async (dispatch) => {
  try {
    const loginp = await axios.post(
      `https://english-quest-back.onrender.com/login`,
      data
    );

    localStorage.setItem("token", loginp.data.token);
    localStorage.setItem("role", loginp.data.role);
    localStorage.setItem("userId", loginp.data.userId);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        token: loginp.data.token,
        role: loginp.data.role,
        userId: loginp.data.userId,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGOUT_SUCCESS,
    });
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
  } catch (error) {
    console.log(error);
  }
};

export const getBooksData = (query, token) => async (dispatch) => {
  try {
    const { language, sort, category, userId, search, sortD } = query;
    let old = "";
    let New = "";
    if (category === "old") {
      old = 1;
    } else if (category === "New") {
      New = 1;
    }
    console.log(category);
    const response = await axios.get(
      `https://english-quest-back.onrender.com/books?language=${language}&sort=${sort}&sortD=${sortD}&old=${old}&New=${New}&userId=${userId}&search=${search}`,
      {
        headers: {
          "Content-Type": "application/json",
          authentication: token,
        },
      }
    );
    console.log(response);
    dispatch({
      type: BOOKS_GET,
      payload: { books: response.data.books },
    });
  } catch (error) {
    console.log(error);
  }
};

export const createBooksData = (formDataToSend, token) => async (dispatch) => {
  try {
    const postData = await axios.post(
      `https://english-quest-back.onrender.com/books`,
      formDataToSend,
      {
        headers: {
          // "Content-Type": "multipart/form-data",
          authentication: token,
        },
      }
    );

    dispatch({
      type: BOOKS_POST,
      payload: { newBooks: postData.data.book },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteData = (token, id) => async (dispatch) => {
  try {
    await axios.delete(
      `https://english-quest-back.onrender.com/books/${id}`,

      {
        headers: {
          authentication: token,
        },
      }
    );

    dispatch({
      type: BOOKS_DELETE,
      payload: { id },
    });
  } catch (error) {
    console.log(error);
  }
};

export const editbooks = (token, id, updatedBooks) => async (dispatch) => {
  try {
    const editbooks = await axios.put(
      `https://english-quest-back.onrender.com/books/${id}`,
      updatedBooks,
      {
        headers: {
          authentication: token,
        },
      }
    );

    dispatch({
      type: BOOKS_PUT,
      payload: { editbook: editbooks.data.book },
    });
  } catch (error) {
    console.log(error);
  }
};
