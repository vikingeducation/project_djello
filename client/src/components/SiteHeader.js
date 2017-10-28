import React from "react";
import { connect } from "react-redux";
import { Menu, Icon, Button } from "semantic-ui-react";

import { logOut } from "../socket";
import Showable from "../components/elements/Showable";

const SiteHeader = ({ user, logOut }) => (
  <Menu>
    <Menu.Item>
      <Menu.Header as="h3">
        <Icon name="tasks" /> Djello!
      </Menu.Header>
    </Menu.Item>
    <Showable condition={user}>
      <Menu.Menu position="right">
        <Menu.Item>{user}</Menu.Item>
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
  logOut: () => dispatch(logOut("Logged out!"))
});

export default connect(mapStateToProps, mapDispatchToProps)(SiteHeader);
