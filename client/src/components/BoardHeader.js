import React from "react";
import { Grid, Header, Form, Select, Button } from "semantic-ui-react";

import NewModalContainer from "../containers/NewModalContainer";
import Showable from "./elements/Showable";

const BoardHeader = ({ info, actions }) => (
  <Grid.Row>
    <Grid.Column computer={6} tablet={8} mobile={16}>
      <Header as="h1">{info.title}</Header>
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
        <Showable condition={info.title}>
          <Button onClick={actions.onDelBoard} basic size="tiny" color="red">
            Delete
          </Button>
        </Showable>
        <NewModalContainer
          buttonProps={{ basic: true, size: "tiny", color: "green" }}
          buttonText="New"
          title="New board title:"
          onCreate={actions.onAddBoard}
        />
      </Form>
    </Grid.Column>
  </Grid.Row>
);

export default BoardHeader;
