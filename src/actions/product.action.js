import axios from "axios";
import axiosIntance from "../helpers/axios";
import { productConstants } from "./constant";

// export const getProduct = () => {
//   return async (dispatch) => {
//     const res = await axiosIntance.get("/product/getproduct");

//     dispatch({
//       type: productConstants.PRODUCT_GET_REQUEST,
//     });

//     if (res.status === 200) {
//       const { categoryList } = res.data;
//       dispatch({
//         type: categoryConstants.CATEGORY_GET_SUCCESS,
//         payload: { categories: categoryList },
//       });
//     } else {
//       dispatch({
//         type: categoryConstants.CATEGORY_GET_SUCCESS,
//         payload:{error:res.data.error}
//       });
//     }
//   };
// };

export const addProduct = (form) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.ADD_NEW_PRODUCT_REQUEST });
    const res = await axiosIntance.post("/product/create", form);
    console.log(res);

    if (res.status === 200) {
      dispatch({
        type: productConstants.ADD_NEW_PRODUCT_SUCCESS,
        payload: { product: res.data._product },
      });
    } else {
      dispatch({
        type: productConstants.ADD_NEW_PRODUCT_FAILURE,
        payload: res.data.error,
      });
    }
  };
};
