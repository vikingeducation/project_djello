import React from "react";
import { Container } from "reactstrap";
import BoardContainer from "../containers/BoardContainer";

const Main = () => {
  return (
    <Container style={{ marginBottom: "40px" }}>

      <BoardContainer />

    </Container>
  );
};

export default Main;
