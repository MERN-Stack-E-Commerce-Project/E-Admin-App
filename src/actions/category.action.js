import axios from "axios";
import axiosIntance from "../helpers/axios";
import { authConstants, categoryConstants } from "./constant";
import store from "../store/index"
export const getAllCategory = () => {
  return async (dispatch) => {
    const res = await axiosIntance.post("/category/getcategory");

    dispatch({
      type: categoryConstants.CATEGORY_GET_REQUEST,
    });

    if (res.status === 200) {
      const { categoryList } = res.data;
      dispatch({
        type: categoryConstants.CATEGORY_GET_SUCCESS,
        payload: { categories: categoryList },
      });
    } else {
      dispatch({
        type: categoryConstants.CATEGORY_GET_SUCCESS,
        payload: { error: res.data.error },
      });
    }
  };
};

export const addCategory = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.ADD_NEW_CATEGORY_REQUEST });

    try {
      const res = await axiosIntance.post("/category/create", form);
      console.log(res);

      if (res.status === 201) {
        dispatch({
          type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
          payload: { category: res.data.category },
        });
      } else {
        dispatch({
          type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
          payload: res.data.error,
        });
      }
    } catch (error) {
      console.log(error);
      const {status} = error.response;

      if(status===500){
        localStorage.clear();
        store.dispatch({type: authConstants.LOGOUT_SUCCESS});
      }


      return Promise.reject(error);
    }
  };
};

export const updateCategories = (form) => {
  return async (dispatch) => {
    dispatch({
      type:categoryConstants.UPDATE_CATEGORY_REQUEST
    });
    console.log("form",form);
    const res = await axiosIntance.post("/category/update", form);
    console.log(res);

    if (res.status === 200) {
      dispatch({
        type:categoryConstants.UPDATE_CATEGORY_SUCCESS,
      })
      console.log(res);
      return true;
    } else {
      const {error}=res.data;
      dispatch({
        type:categoryConstants.UPDATE_CATEGORY_FAILURE,
        payload:{error}
      })
      return false;
    }
  };
};

export const deleteSelectedCategories = (ids) => {
  return async (dispatch) => {
    dispatch({
      type:categoryConstants.DELETE_CATEGORY_REQUEST
    })
    const res = await axiosIntance.post("/category/delete", {
      payload: {
        ids,
      },
    });
    // console.log(res);

    if (res.status === 200) {
      dispatch({
        type:categoryConstants.DELETE_CATEGORY_SUCCESS
      })
      console.log(res);
      return true;
    } else {
      const {error}=res.data;
      dispatch({
        type:categoryConstants.DELETE_CATEGORY_FAILURE,
        payload:{error}
      })
      return false;
    }
  };
};
