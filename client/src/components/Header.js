import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const Header = (props) => {
  return (
    <div className='header'>
      <Navbar color='faded' >
        <NavbarBrand href='/'>Djello</NavbarBrand>
        <Nav className="ml-auto" navbar>
              <NavItem>
                Welcome, {props.user}!
              </NavItem>
              <NavItem>
                <NavLink href="/logout">Log Out</NavLink>
              </NavItem>
            </Nav>
      </Navbar>
    </div>
  );
};

export default Header;