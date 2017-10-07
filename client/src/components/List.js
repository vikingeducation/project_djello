import React from "react";
import { Header, Segment, Divider, Grid } from "semantic-ui-react";

import NewModalContainer from "../containers/NewModalContainer";

const Card = ({ title }) => <Segment>{title}</Segment>;

const List = ({ list, actions }) => (
  <Grid.Column computer={4} tablet={8} mobile={16}>
    <Segment>
      <Header as="h3">{list.title}</Header>
      <p>{list.description}</p>
      <Divider />
      {list.cards.map(card => <Card key={card.slug} title={card.title} />)}
      <NewModalContainer
        buttonProps={{ basic: true, color: "violet" }}
        buttonText="Add a Card"
        type="card"
      />
    </Segment>
  </Grid.Column>
);

export default List;
