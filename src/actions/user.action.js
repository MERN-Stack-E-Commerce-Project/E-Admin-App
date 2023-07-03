import { authConstants, userConstants } from "./constant";
import axiosIntance from "../helpers/axios";

export const signup = (user) => {
  //  console.log(user);

  return async (dispatch) => {
    dispatch({
      type: userConstants.USER_REGISTER_REQUEST,
      payload: {
        login: true,
      },
    });

    const res = await axiosIntance.post("/admin/signup", {
      ...user,
    });

    if (res.status === 200) {
      const { message } = res.data;
      dispatch({
        type: userConstants.USER_REGISTER_SUCCESS,
        payload: {
          message
        },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: userConstants.USER_REGISTER_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};




