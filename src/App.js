import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect } from "react";
import Layout from "./components/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./containers/Signup";
import Home from "./containers/Home";
import Signin from "./containers/Signin";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory, isUserLoggedIn } from "./actions";
import Products from "./containers/Products";
import Orders from "./containers/Orders";

import Category from "./containers/Category";
import { getInitialData } from './actions';
import Page from './containers/Page';
// import PrivateRoute from "./components/HOC/PrivateRoute";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.authenticate !== undefined && !auth.authenticate)
      dispatch(isUserLoggedIn());
      dispatch(getInitialData());
      // dispatch(getAllCategory());
  }, []);

  return (
    <div className="App">
      <Routes>         
        <Route exact path="/" element={<Home />} />
        <Route path="/page" element={<Page />} />
        <Route path="/products" element={<Products/>} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/category" element={<Category/>} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </div>
  );
}

export default App;
