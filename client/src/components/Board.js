import React from "react";
import { Grid, Header, Divider, Loader } from "semantic-ui-react";
import List from "./List";
import NewModalContainer from "../containers/NewModalContainer";
import BoardHeaderContainer from "../containers/BoardHeaderContainer";
import Showable from "./elements/Showable";

const Board = ({ fetching, boardsToShow, lists }) => (
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
    <Showable condition={lists.length}>
      <Grid.Row>
        {lists.map(list => <List key={list.slug} list={list} />)}
        <Grid.Column
          computer={4}
          tablet={8}
          mobile={16}
          textAlign="center"
          verticalAlign="middle"
        >
          <NewModalContainer
            buttonProps={{ color: "violet" }}
            buttonText="Add a List"
            type="list"
          />
        </Grid.Column>
      </Grid.Row>
    </Showable>
  </Grid>
);

export default Board;
