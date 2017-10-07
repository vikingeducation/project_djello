import React from "react";
import { Modal, Button, Form } from "semantic-ui-react";

const NewModal = ({ actions, info }) => (
  <span>
    <Button {...info.buttonProps} onClick={actions.handleOpen}>
      {info.buttonText}
    </Button>
    <Modal open={info.open} onClose={actions.handleClose} size="mini" closeIcon>
      <Modal.Header>{info.modalTitle}</Modal.Header>
      <Modal.Content>
        <Form onSubmit={actions.onCreate}>
          <Form.Input
            onChange={actions.onChange}
            value={info.title}
            autoFocus
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={actions.onCreate} color="green">
          Create!
        </Button>
      </Modal.Actions>
    </Modal>
  </span>
);

export default NewModal;
