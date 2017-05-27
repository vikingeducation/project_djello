import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
const CreateBoardModal = ({ handleSubmit, toggle, modal }) => {
  return (
    <div style={{ display: "inline-block" }}>
      <Button
        color="info"
        style={{ marginLeft: "10px", marginRight: "10px" }}
        onClick={toggle}
      >
        New Board
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create New Board</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="boardName">Name</Label>
              <Input
                type="name"
                name="name"
                id="boardName"
                placeholder="Your new board's name"
              />
            </FormGroup>
            <Button type="submit" color="info" onClick={toggle}>
              Create
            </Button>
          </Form>

        </ModalBody>
      </Modal>
    </div>
  );
};

export default CreateBoardModal;
