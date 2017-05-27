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
const CreateListModal = ({ handleSubmitList, toggle, modal, boardId }) => {
  return (
    <div>
      <Button color="success" onClick={toggle}>
        Add New List
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create New List</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmitList(boardId)}>
            <FormGroup>
              <Label for="listTitle">Title</Label>
              <Input
                type="text"
                name="title"
                id="listTitle"
                placeholder="Your new list's title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="descriptionList">Description</Label>
              <Input type="textarea" name="description" id="descriptionList" />
            </FormGroup>
            <Button type="submit" color="info" onClick={toggle}>
              Add
            </Button>
          </Form>

        </ModalBody>
      </Modal>
    </div>
  );
};

export default CreateListModal;
