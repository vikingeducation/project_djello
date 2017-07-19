import React from "react";
import { Navbar } from "react-bootstrap";

const Header = ({ title }) => {
  return (
    <Navbar fluid inverse>
      <Navbar.Header>
        <Navbar.Brand>
          <a>{title}</a>
        </Navbar.Brand>
      </Navbar.Header>
    </Navbar>
  );
};

export default Header;
