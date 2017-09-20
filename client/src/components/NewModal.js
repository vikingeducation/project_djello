import React from "react";
import { Modal, Button, Form } from "semantic-ui-react";

const NewModal = ({ title, open, onClose, onChange, onCreate }) => (
  <Modal open={open} onClose={onClose} size="mini" closeIcon>
    <Modal.Header>Add a title:</Modal.Header>
    <Modal.Content>
      <Form onSubmit={onCreate}>
        <Form.Input onChange={onChange} value={title} />
      </Form>
    </Modal.Content>
    <Modal.Actions>
      <Button onClick={onCreate} color="green">
        Create!
      </Button>
    </Modal.Actions>
  </Modal>
);

export default NewModal;
