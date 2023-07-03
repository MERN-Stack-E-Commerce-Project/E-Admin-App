import axiosIntance from "../helpers/axios";
import { pageConstants } from "./constant"





export const createPage=(form)=>{


    return async dispatch=>{
           dispatch({type: pageConstants.CREATE_PAGE_REQUEST});
           try{
            const res=await axiosIntance.post("/page/create",form);

            if(res.status===200){
                dispatch({
                    type:pageConstants.CREATE_PAGE_SUCCESS,
                    payload:{page:res.data.page}
                })
            }
            else{
                dispatch({
                    type:pageConstants.CREATE_PAGE_FAILURE,
                    payload:{error:res.data.error}
                })
            
            }

           }catch(e){
                console.log(e);
           }
    }
}