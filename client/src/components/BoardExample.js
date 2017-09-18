import React, { Component } from "react";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";

import { Grid, Row, Col } from "react-flexbox-grid";

import { deepPurple100 } from "material-ui/styles/colors";

import { Divider } from "material-ui";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";

const styleCard = {
  backgroundColor: deepPurple100
};

const Board = () => {
  return (
    <div>
      <br />
      <br />
      <Grid fluid>
        <Row>
          <Col lg={4}>
            <Card style={styleCard}>
              <CardTitle title="Eat Doritoes" style={{ textAlign: "center" }} />
              <CardText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                mattis pretium massa.
              </CardText>
              <Divider />
              <Grid fluid>
                <br />
                <Row>
                  <Col lg={12}>
                    <Card>
                      <CardText>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec mattis pretium massa.
                      </CardText>
                    </Card>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg={12}>
                    <Card>
                      <CardText>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec mattis pretium massa.
                      </CardText>
                    </Card>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lgOffset={5} lg={12}>
                    <FloatingActionButton mini={true}>
                      <ContentAdd />
                    </FloatingActionButton>
                  </Col>
                </Row>
                <br />
              </Grid>
            </Card>
          </Col>
          <Col lg={4}>
            <Row>
              <Col lgOffset={5}>
                <FloatingActionButton>
                  <ContentAdd />
                </FloatingActionButton>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Board;
