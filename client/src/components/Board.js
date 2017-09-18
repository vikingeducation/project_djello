import React, { Component } from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import { deepPurple100 } from "material-ui/styles/colors";
import { Divider } from "material-ui";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";

import ListContainer from "../containers/ListContainer";

const ListAdder = () => {
  return (
    <Col lg={4}>
      <Row>
        <Col lgOffset={5} lg={12}>
          <FloatingActionButton mini={false}>
            <ContentAdd />
          </FloatingActionButton>
        </Col>
      </Row>
    </Col>
  );
};

const Board = ({ lists }) => {
  lists = lists.map(list => <ListContainer list={list} key={list._id} />);
  return (
    <div>
      <br />
      <br />
      <Grid fluid>
        <Row>
          {lists}
          <ListAdder />
        </Row>
      </Grid>
    </div>
  );
};

export default Board;
