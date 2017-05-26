import React from "react";
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardDeck,
  CardSubtitle,
  CardBlock
} from "reactstrap";
import Cards from "./Cards";

const List = props => {
  const { title, description, cards } = props;
  return (
    <Card>
      <CardBlock>
        <CardTitle>{title}</CardTitle>
        <CardSubtitle style={{ marginBottom: "30px" }}>
          {description}
        </CardSubtitle>
        <Cards cards={cards} />
        <Button>Add A Card</Button>
      </CardBlock>
    </Card>
  );
};

const listGroup = lists =>
  lists.map(list => {
    return (
      <List
        key={list.id}
        title={list.title}
        description={list.description}
        cards={list.Cards}
      />
    );
  });

const Lists = ({ lists }) => {
  return (
    <CardDeck>

      {lists.length ? listGroup(lists) : <p>No Lists...</p>}
    </CardDeck>
  );
};

export default Lists;
