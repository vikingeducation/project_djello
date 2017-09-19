import React, { Component } from "react";
import { Card, CardTitle, CardText } from "material-ui/Card";
import { Divider } from "material-ui";
import { Grid, Row, Col } from "react-flexbox-grid";
import { deepPurple100 } from "material-ui/styles/colors";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import AddCard from "./AddCard";

import DjelloCard from "./DjelloCard";

const styleCard = {
  backgroundColor: deepPurple100
};

const CardAdder = ({ onAddCard }) => {
  return (
    <Col lg={12}>
      <Row>
        <Col lgOffset={5} lg={12}>
          <FloatingActionButton mini={true} onClick={onAddCard}>
            <ContentAdd />
          </FloatingActionButton>
        </Col>
      </Row>
    </Col>
  );
};

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addCard: false
    };
  }

  onAddCard = () => {
    this.setState({ addCard: true });
  };

  onCloseCard = () => {
    this.setState({ addCard: false });
  };

  render() {
    console.log("this.state: ", this.state);
    const { title, description } = this.props.list;
    const DjelloCards = this.props.cards.map(card =>
      <div key={card._id}>
        <br />
        <DjelloCard card={card} />
      </div>
    );

    return (
      <Col lg={4}>
        <Card style={styleCard}>
          <CardTitle title={title} style={{ textAlign: "center" }} />
          <CardText>
            {description}
          </CardText>
          <Divider />
          <Grid fluid>
            {DjelloCards}
            <br />
            {this.state.addCard
              ? <AddCard onCloseCard={this.onCloseCard} />
              : <CardAdder onAddCard={this.onAddCard} />}

            <br />
          </Grid>
        </Card>
      </Col>
    );
  }
}

export default List;
