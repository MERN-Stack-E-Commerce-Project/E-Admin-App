import React from "react";
import { NavLink, Navigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { Col, Container, Row } from "react-bootstrap";
import "./style.css";

export default function Home(props) {
  const token = window.localStorage.getItem("FCtoken");
  if (!token) {
    return <Navigate replace to="/signin" />;
  }
  // console.log(token);

  return (
    <>
      <Layout sidebar={true}>
          it's Home vro
      </Layout>
    </>
  );
}
