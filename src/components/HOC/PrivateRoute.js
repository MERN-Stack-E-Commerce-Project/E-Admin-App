import React from "react";
import {
  Navigate,
  NavLink,
  redirect,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Signin from "../../containers/Signin";

// const PrivateRoute = ({element: Component, ...rest})=>{
//     return <Route {...rest} element={(props)=>{
//         const token= window.localStorage.getItem('token');

//         if(token){
//             return <Component {...props}/>
//         }else{
//             return redirect("/signin");

//         }
//     }} />
// }

const PrivateRoute = (props) => {
  const token = window.localStorage.getItem("FCtoken");
  return token ? <Route props /> : <Navigate replace to="/signin"/>
  
};

export default PrivateRoute;
