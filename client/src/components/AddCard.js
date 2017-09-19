import React from "react";
import { TextField, RaisedButton } from "material-ui";
import { deepPurple100 } from "material-ui/styles/colors";
import IconButton from "material-ui/IconButton";
import CloseIcon from "material-ui/svg-icons/navigation/close";
import { Grid, Row, Col } from "react-flexbox-grid";

const styleTextField = {
  backgroundColor: "#FFF",
  padding: "5px"
};

const styleButton = {
  marginLeft: "-30px"
};

const styleCloseIcon = {
  marginRight: "80px"
};

const AddCard = ({ onCloseCard }) => {
  return (
    <div>
      <TextField floatingLabelText="title" style={styleTextField} />
      <br />
      <br />
      <TextField
        floatingLabelText="description"
        rows={2}
        rowsMax={4}
        style={styleTextField}
      />
      <br />
      <br />
      <Grid fluid>
        <Row>
          <Col lg={2}>
            <RaisedButton label="Confirm" primary={true} style={styleButton} />
          </Col>
          <Col lg={2} lgOffset={8}>
            <IconButton onClick={onCloseCard}>
              <CloseIcon />
            </IconButton>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default AddCard;
