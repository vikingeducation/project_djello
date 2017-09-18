import React from "react";
import { Grid, Select, Header } from "semantic-ui-react";

const Board = ({ info, actions }) => (
  <Grid>
    <Grid.Row>
      <Grid.Column tablet={8} mobile={16}>
        <Header as="h1">{info.selected.title}</Header>
      </Grid.Column>
      <Grid.Column tablet={8} mobile={16} textAlign="right">
        <Select
          onChange={actions.onChangeBoard}
          placeholder="Select a board"
          options={info.boards}
        />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default Board;
