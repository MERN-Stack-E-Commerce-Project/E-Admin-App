import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk"
import rootReducer from "../reducers/index"
import { composeWithDevTools } from '@redux-devtools/extension';

const store= createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));
// const store =createStore(rootReducer);


export default store;