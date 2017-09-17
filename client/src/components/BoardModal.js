import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import Form from "../components/Form";

const actions = [
  <FlatButton
    label="Ok"
    primary={true}
    keyboardFocused={true}
    onClick={this.handleModalOpen}
  />
];

const BoardModal = props =>
  <div>
    <Dialog
      title="Add a new board"
      modal={false}
      actions={actions}
      open={props.open}
      onRequestClose={props.onRequestClose}
    >
      Please provide a name for your new board
      <Form createBoard={props.createBoard} user={props.user} />
    </Dialog>
  </div>;

export default BoardModal;
