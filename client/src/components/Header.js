import React from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";

const LogOut = ({ isAuthenticated, email, onLogout }) => {
  if (!isAuthenticated) {
    return null;
  }

  return (
    <Nav pullRight>
      <NavItem onClick={onLogout}>
        Logout {email}
      </NavItem>
    </Nav>
  );
};

const Header = ({ title, isAuthenticated, email, onLogout }) => {
  return (
    <Navbar fluid>
      <Navbar.Header>
        <Navbar.Brand>
          <a>{title}</a>
        </Navbar.Brand>
      </Navbar.Header>
      <LogOut
        isAuthenticated={isAuthenticated}
        email={email}
        onLogout={onLogout}
      />
    </Navbar>
  );
};

export default Header;
