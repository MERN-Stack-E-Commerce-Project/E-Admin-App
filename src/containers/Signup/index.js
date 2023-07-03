import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import Input from '../../components/UI/Input';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { signup } from '../../actions';

export default function Signup
() {

  const [firstName,setfname]=useState();
  const [lastName,setlname]=useState();
  const [email,setemail]=useState();
  const [password,setpassword]=useState();
  const [msg,setmsg]=useState();

  // const dispatch = useDispatch();
  // useEffect(()=>{
  //   if(auth.authenticate!==undefined && !auth.authenticate)
  //   dispatch(isUserLoggedIn());
  // },[]);

const user=useSelector(state=>state.user);
const auth=useSelector(state => state.auth);
const dispatch = useDispatch();
  if(auth.authenticate!==undefined && auth.authenticate){
    return <Navigate replace to="/" />;      
  }

  const register=(e)=>{
    e.preventDefault();
        const user ={
      firstName,lastName,
      email,password
     }
     dispatch(signup(user));
  }

  if(user.loading!=undefined && user.loading){
      return <p>loading....</p>
  }





  return (
    <>
      <Layout>
        <Container>
          {user.message}
          <Row style={{ marginTop: "50px" }}>
            <Col md={{ span: 6, offset: 3 }}>
              <Form onSubmit={register}>
                <Row>
                  <Col md={6}>
                    <Input
                      label="First Name"
                      type="text"
                      placeholder="first name"
                      onChange={(e)=>setfname(e.target.value)}
                      value={firstName}
                    />
                  </Col>
                  <Col md={6}>
                    <Input
                      label="Last Name"
                      type="text"
                      placeholder="last name"
                      onChange={(e)=>setlname(e.target.value)}
                      value={lastName}
                    />
                  </Col>
                </Row>
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter email"
                  errorMessage="We'll never share your email with anyone else."
                  onChange={(e)=>setemail(e.target.value)}
                      value={email}
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="Password"
                  onChange={(e)=>setpassword(e.target.value)}
                      value={password}
                />
                <Button
                  style={{ margin: "1rem 0" }}
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  );
}
