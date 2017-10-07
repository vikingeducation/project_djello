import React from "react";
import { Grid, Header, Divider, Loader } from "semantic-ui-react";
import List from "./List";
import NewModalContainer from "../containers/NewModalContainer";
import BoardHeaderContainer from "../containers/BoardHeaderContainer";
import Showable from "./elements/Showable";

const DEFAULTS = {
  computer: 4,
  tablet: 8,
  mobile: 16,
  style: { paddingBottom: "10px" }
};

const ListColumn = ({ props, children }) => (
  <Grid.Column {...DEFAULTS} {...props}>
    {children}
  </Grid.Column>
);

const Board = ({ fetching, boardsToShow, lists, onAddList }) => (
  <Grid>
    <Loader active={fetching} />
    <BoardHeaderContainer />
    <Divider />
    <Showable condition={!boardsToShow}>
      <Grid.Row>
        <Header as="h2">
          <p>You don't have any boards...</p>
          <NewModalContainer
            buttonProps={{ color: "green" }}
            buttonText="Create One"
            type="board"
          />
        </Header>
      </Grid.Row>
    </Showable>
    <Grid.Row>
      {lists.map(list => (
        <ListColumn key={list.slug}>
          <List list={list} />
        </ListColumn>
      ))}
      <ListColumn props={{ textAlign: "center", verticalAlign: "middle" }}>
        <NewModalContainer
          buttonProps={{ color: "violet" }}
          buttonText="Add a List"
          title="New list title:"
          onCreate={onAddList}
        />
      </ListColumn>
    </Grid.Row>
  </Grid>
);

export default Board;
