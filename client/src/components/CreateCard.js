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

class CreateCard extends React.Component {
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
    const { handleSubmitCard, boardId, listId } = this.props;
    return (
      <div>
        <Button color="secondary" onClick={this.toggle}>
          Add New Card
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Create New Card</ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmitCard({ boardId, listId })}>
              <FormGroup>
                <Label for="listTitle">Title</Label>
                <Input
                  type="text"
                  name="title"
                  id="listTitle"
                  placeholder="Your new card's title"
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

export default CreateCard;
