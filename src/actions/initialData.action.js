import axiosIntance from "../helpers/axios";
import {
  categoryConstants,
  intialDataConstants,
  productConstants,
} from "./constant";

function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null || parentId=="") {
    category = categories.filter((cat) => cat.parentId == undefined||cat.parentId=="");
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      type:cate.type,
      children: createCategories(categories, cate._id),
    });
  }
  return categoryList;
}

export const getInitialData = () => {
  return async (dispatch) => {
    dispatch({ type: intialDataConstants.GET_ALL_INITIAL_DATA_REQUEST });
    const res = await axiosIntance.post("/initialdata");
    console.log(res);
    if (res.status === 200) {
      const { categories, products } = res.data;
      dispatch({
        type: categoryConstants.CATEGORY_GET_SUCCESS,
        payload: { categories: createCategories(categories) },
      });
      dispatch({
        type: productConstants.GET_PRODUCT_SUCCESS,
        payload: {
          products,
        },
      });
    } else {
      dispatch({
        type: categoryConstants.CATEGORY_GET_FAILURE,
        payload: { error: res.data.error },
      });
      dispatch({
        type: productConstants.GET_PRODUCT_FAILURE,
        payload: {
          error: res.data.error,
        },
      });
    }
  };
};
