import React from "react";
import {
  Grid,
  Select,
  Header,
  Button,
  Form,
  Divider,
  Loader
} from "semantic-ui-react";
import List from "./List";
import Showable from "./elements/Showable";

const Board = ({ info, actions }) => (
  <Grid>
    <Loader active={info.fetching} />
    <Grid.Row>
      <Grid.Column computer={6} tablet={8} mobile={16}>
        <Header as="h1">{info.current.title || "You have no boards..."}</Header>
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
          <Button basic size="tiny" color="red">
            Delete
          </Button>
          <Button basic size="tiny" color="green">
            New
          </Button>
        </Form>
      </Grid.Column>
    </Grid.Row>
    <Divider />
    <Showable condition={info.current.title}>
      <Grid.Row>
        {info.current.lists &&
          info.current.lists.map(list => <List key={list.slug} list={list} />)}
        <Grid.Column
          computer={4}
          tablet={8}
          mobile={16}
          textAlign="center"
          verticalAlign="middle"
        >
          <Button color="violet">Add a List</Button>
        </Grid.Column>
      </Grid.Row>
    </Showable>
  </Grid>
);

export default Board;
