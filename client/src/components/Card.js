import React from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import { Card, CardText } from "material-ui/Card";

const Card = ({ card }) => {
  const { title, description, activities } = card;
  return (
    <Row>
      <Col lg={12}>
        <Card>
          <CardTitle title={title} style={{ textAlign: "center" }} />
          <CardText>
            {description}
          </CardText>
        </Card>
      </Col>
    </Row>
  );
};

export default Card;
