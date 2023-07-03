import React from "react";
import { Navbar, NavDropdown, Nav, Container } from "react-bootstrap";
import { NavLink, Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../actions/auth.action";

export default function Header(props) {
  // const auth = useSelector((state) => state.auth);
  // const dispatch=useDispatch();

  const auth=useSelector(state => state.auth);
  const dispatch = useDispatch();

  const logout=()=>{
     dispatch(signout());    
     return <NavLink to={"/"}/> ;
  }

  const renderLoggedInLink = () => {
    return (
      <Nav>
        <li className="nav-item">
          <span className="nav-link" onClick={logout}>Log out</span>
        </li>
      </Nav>
    );
  };

  const renderNotLoggenInLink = () => {
    return (
      <Nav>
        <li className="nav-item">
          <NavLink to="/signin" className="nav-link">
            Log In
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/signup" className="nav-link">
            Sign Up
          </NavLink>
        </li>
      </Nav>
    );
  };

  return (
    <>
      <Navbar bg="light" fixed="top" expand="lg" style={{ zIndex: 100 }}>
        <Container fluid>
          {/* <Navbar.Brand href="/">Admin Dashboard</Navbar.Brand> */}
          <Link className="navbar-brand" exact to="/">
            Admin Dashboard
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
            </Nav>
            {auth.authenticate != undefined && auth.authenticate == true
              ? renderLoggedInLink()
              : renderNotLoggenInLink()}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
