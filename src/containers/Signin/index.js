import React, { useEffect, useState } from 'react'
import { Container,Button,Form,Row,Col } from 'react-bootstrap'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input';
import { login } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { isUserLoggedIn } from '../../actions/auth.action';

export default function Signin
() {

  const [email,setEmail] = useState("");
  const [password,setPass] = useState("");
   const [error,setErr]= useState("");
   const navigate=useNavigate();

const auth=useSelector(state => state.auth);
  const dispatch = useDispatch();
//   useEffect(()=>{
//     if(auth.authenticate!==undefined && !auth.authenticate)
//     dispatch(isUserLoggedIn());
//   },[]);

  const userLogin=(e)=>{

     e.preventDefault();
       
     const user ={
      email,password
     }

     dispatch(login(user));
  }

     if(auth.authenticate!==undefined && auth.authenticate){
       return <Navigate replace to="/" />;      
     }

  return (
    <>
      <Layout>
        <Container>
          <Row style={{ marginTop: "50px" }}>
            <Col md={{ span: 6, offset: 3 }}>
              <Form onSubmit={userLogin}>
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  errorMessage="We'll never share your email with anyone else."
                />
                <Input
                  label="Password"
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPass(e.target.value)}
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
