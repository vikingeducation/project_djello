import React from "react";

import { Card, CardTitle, CardText } from "material-ui/Card";
import { Row, Col } from "react-flexbox-grid";
import { deepPurple100 } from "material-ui/styles/colors";

const styleCard = {
  backgroundColor: deepPurple100
};

const List = ({ list }) => {
  const { title, description, cards } = list;
  return (
    <Col lg={4}>
      <Card style={styleCard}>
        <CardTitle title={title} style={{ textAlign: "center" }} />
        <CardText>
          {description}
        </CardText>
      </Card>
    </Col>
  );
};

export default List;
