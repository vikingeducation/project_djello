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
import NewModalContainer from "../containers/NewModalContainer";
import Showable from "./elements/Showable";

const Board = ({ info, actions }) => (
  <Grid>
    <Loader active={info.fetching} />
    <Grid.Row>
      <Grid.Column computer={6} tablet={8} mobile={16}>
        <Header as="h1">
          {info.current.title || "Please select a board:"}
        </Header>
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
          <Showable condition={info.current.slug}>
            <Button
              onClick={actions.onDelBoard(info.current.slug)}
              basic
              size="tiny"
              color="red"
            >
              Delete
            </Button>
          </Showable>
          <NewModalContainer
            buttonProps={{ basic: true, size: "tiny", color: "green" }}
            buttonText="New"
            type="board"
          />
        </Form>
      </Grid.Column>
    </Grid.Row>
    <Divider />
    <Showable condition={!info.numBoards}>
      <Grid.Row>
        <Header as="h2">
          You don't have any boards...{" "}
          <Button onClick={actions.onAddBoard} color="green">
            Create One
          </Button>
        </Header>
      </Grid.Row>
    </Showable>
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
