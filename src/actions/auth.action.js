import axiosIntance from "../helpers/axios";
import { authConstants } from "./constant";

export const login = (user) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.LOGIN_REQUEST,
      payload: {
        login: true,
      },
    });

    const res = await axiosIntance.post("/admin/signin", {
      ...user,
    });

    if (res.status === 200) {
      const { token, user } = res.data;
      localStorage.setItem("FCtoken", token);
      localStorage.setItem("FCuser", JSON.stringify(user));
      dispatch({
        type: authConstants.lOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }

    // console.log(res.data.user);

    // dispatch({type: authConstants.LOGIN_REQUEST,
    // payload:{
    //     ...user
    // }})
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("FCtoken");
    if (token) {
      const user = JSON.parse(localStorage.getItem("FCuser"));
      dispatch({
        type: authConstants.lOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: "Failed to login" },
      });
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.LOGIN_REQUEST,
      payload: { message: "Requested to be signout" },
    });

    const res = await axiosIntance.post("/admin/signout");
    if (res.status === 200) {
      localStorage.clear();
      dispatch({
        type: authConstants.LOGOUT_SUCCESS,
        payload: { message: "Logout successfully" },
      });
    } else {
      dispatch({
        type: authConstants.LOGOUT_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
