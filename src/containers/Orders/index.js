
import React from 'react'
import Layout from '../../components/Layout'
import { Navigate } from 'react-router-dom';

export default function Orders(props) {
  const token = window.localStorage.getItem("FCtoken");
  if (!token) {
    return <Navigate replace to="/signin" />;
  }

  return (
    <Layout sidebar={true}>
       orders
    </Layout>
  )
}
