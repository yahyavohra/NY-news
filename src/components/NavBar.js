import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import loading from "../assets/abc.svg";
import {Container,Navbar, NavbarBrand, Nav, NavItem, Button } from "reactstrap";
import { useAuth0 } from "../utils/auth0-spa";
const NavBar = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin
    });
  return (
    <div className="nav-container">
      <Navbar color="dark"  expand="md">
        <Container>
          <NavbarBrand className="logo mr-auto" tag={RouterNavLink} to="/" exact activeClassName="router-link-exact-active"> 
            <img src={loading} alt="logo" />
            <h2 className="">NYT NEWS</h2>
          </NavbarBrand>
          
            <Nav className="   d-md-block" navbar>
            {!isAuthenticated ?  
              <NavItem>
                  <Button id="qsLoginBtn" color="primary " className="btn-margin login-btn" onClick={() => loginWithRedirect({})}>
                    Sign in
                  </Button>
              </NavItem>
            :
            <NavItem>
              <img src={user.picture} alt="Profile" className="nav-user-profile rounded-circle" />
              <span className="login-text">Hello, {user.name}  |  </span>
              <Button id="qsLoginBtn" color="link " className="btn btn-link login-out" onClick={() => logoutWithRedirect({})}>
                Sign out
              </Button>
            </NavItem>
            }
              
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
