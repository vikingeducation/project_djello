import React from "react";
import { Header, Segment, Divider, Button, Grid } from "semantic-ui-react";

const Card = ({ title }) => <Segment>{title}</Segment>;

const List = ({ list, actions }) => (
  <Grid.Column computer={4} tablet={8} mobile={16}>
    <Segment>
      <Header as="h3">{list.title}</Header>
      <p>{list.description}</p>
      <Divider />
      {list.cards.map(card => <Card key={card.slug} title={card.title} />)}
      <Button basic color="violet">
        Add a Card
      </Button>
    </Segment>
  </Grid.Column>
);

export default List;
