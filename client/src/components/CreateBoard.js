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

class CreateBoard extends React.Component {
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
    const { handleSubmitBoard } = this.props;
    return (
      <div style={{ display: "inline-block" }}>
        <Button
          color="info"
          style={{ marginLeft: "10px", marginRight: "10px" }}
          onClick={this.toggle}
        >
          New Board
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Create New Board</ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmitBoard}>
              <FormGroup>
                <Label for="boardName">Name</Label>
                <Input
                  type="name"
                  name="name"
                  id="boardName"
                  placeholder="Your new board's name"
                />
              </FormGroup>
              <Button type="submit" color="info" onClick={this.toggle}>
                Create
              </Button>
            </Form>

          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default CreateBoard;
