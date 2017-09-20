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

class CreateList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const { handleSubmitList, currentBoard } = this.props;
    return (
      <div>
        <Button color="success" onClick={this.toggle}>
          Add New List
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Create New List</ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmitList(currentBoard.id)}>
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
                <Input
                  type="textarea"
                  name="description"
                  id="descriptionList"
                />
              </FormGroup>
              <Button type="submit" color="info" onClick={this.toggle}>
                Add
              </Button>
            </Form>

          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default CreateList;
