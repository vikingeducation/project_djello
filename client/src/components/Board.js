import React from "react";
import { Grid, Select, Header, Button, Form, Divider } from "semantic-ui-react";
import List from "./List";

const Board = ({ info, actions }) => (
  <Grid>
    <Grid.Row>
      <Grid.Column computer={6} tablet={8} mobile={16}>
        <Header as="h1">{info.selected.title}</Header>
      </Grid.Column>
      <Grid.Column computer={6} tablet={8} mobile={16} textAlign="right">
        <Form>
          <Form.Field>
            <Select
              onChange={actions.onChangeBoard}
              placeholder="Select a board"
              options={info.boards}
            />
          </Form.Field>
          <Button size="tiny" color="red">
            Delete
          </Button>
          <Button size="tiny" color="green">
            New
          </Button>
        </Form>
      </Grid.Column>
    </Grid.Row>
    <Divider />
    <Grid.Row>
      {info.selected.lists.map(list => <List list={list} />)}
      <Grid.Column
        computer={4}
        tablet={8}
        mobile={16}
        textAlign="center"
        verticalAlign="middle"
      >
        <Button color="olive">Add a List</Button>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default Board;
