import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const SiteHeader = () => (
  <Menu>
    <Link to="/">
      <Menu.Item color="blue" header>
        <Icon name="tasks" /> Djello!
      </Menu.Item>
    </Link>
    <Menu.Item position="right">Log Out</Menu.Item>
  </Menu>
);

export default SiteHeader;
