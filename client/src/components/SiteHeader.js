import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Menu, Icon } from "semantic-ui-react";

import { userActions } from "../actions";
import Showable from "../components/elements/Showable";

const SiteHeader = ({ user, logOut }) => (
  <Menu>
    <Link to="/">
      <Menu.Item color="blue" header>
        <Icon name="tasks" /> Djello!
      </Menu.Item>
    </Link>
    <Showable condition={user}>
      <Menu.Item onClick={logOut} position="right">
        Log Out
      </Menu.Item>
    </Showable>
  </Menu>
);

const mapStateToProps = state => ({ user: state.user.username });

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(userActions.logOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(SiteHeader);
