import React, { Component } from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import PropTypes from 'prop-types'


export default class Header extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false
    }
    this.logOut = this.logOut.bind(this)
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  logOut(e) {
    e.preventDefault()
    this.props.logOut();
  }
  render() {

    const { user, logOut } = this.props

    return (
      <div>
        <Navbar color='light' expand="md">
          <h1 className="navbar-text text-dark h4 m-0">Djello</h1>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
               <span className="navbar-text text-dark">Welcome, {user.name}</span>
              </NavItem>
              <NavItem>
                <NavLink onClick={logOut} href="#">Sign Out</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

Header.propTypes = {
  user: PropTypes.object,
  logOUut: PropTypes.func
}