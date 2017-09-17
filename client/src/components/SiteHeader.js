import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Menu, Icon, Button } from "semantic-ui-react";

import { userActions } from "../actions";
import Showable from "../components/elements/Showable";

const SiteHeader = ({ user, logOut }) => (
  <Menu secondary>
    <Link to="/">
      <Menu.Item color="blue" header>
        <Icon name="tasks" /> Djello!
      </Menu.Item>
    </Link>
    <Showable condition={user}>
      <Menu.Menu position="right">
        <Menu.Item>Welcome {user}</Menu.Item>
        <Menu.Item>
          <Button primary onClick={logOut}>
            Log Out
          </Button>
        </Menu.Item>
      </Menu.Menu>
    </Showable>
  </Menu>
);

const mapStateToProps = state => ({ user: state.user.username });

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(userActions.logOut("Logged out!"))
});

export default connect(mapStateToProps, mapDispatchToProps)(SiteHeader);
