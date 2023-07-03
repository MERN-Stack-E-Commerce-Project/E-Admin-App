import { productConstants } from "../actions/constant";


const initalState={
    products:[]
}

export default (state=initalState,action)=>{
    switch(action.type){
        case productConstants.GET_PRODUCT_SUCCESS:
            state={
                ...state,
                products:action.payload.products
            }
            break;
    }

    return state;
}