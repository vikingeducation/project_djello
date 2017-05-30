import React from "react";
import {
  Card,
  CardTitle,
  CardSubtitle,
  CardBlock,
  InputGroup,
  InputGroupButton,
  Input
} from "reactstrap";
import Cards from "./Cards";
import DeleteListButton from "./DeleteListButton";
import CreateCard from "./CreateCard";
const NameEdit = ({ toggleTitle, title, onChange, onSubmit }) => {
  return (
    <div>
      <InputGroup>
        <Input
          onChange={onChange}
          name="title"
          value={title}
          onKeyPress={onSubmit}
        />
        <InputGroupButton color="secondary" onClick={toggleTitle}>
          Cancel
        </InputGroupButton>
      </InputGroup>

    </div>
  );
};
const DescriptionEdit = ({
  onChange,
  description,
  onSubmit,
  toggleDescription
}) => {
  return (
    <div>
      <InputGroup>
        <Input
          type="textarea"
          onChange={onChange}
          name="description"
          value={description}
          onKeyPress={onSubmit}
        />
        <InputGroupButton color="secondary" onClick={toggleDescription}>
          Cancel
        </InputGroupButton>
      </InputGroup>

    </div>
  );
};

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editTitle: false,
      editDescription: false,
      title: props.title,
      description: props.description,
      isSubmitted: false
    };
    this.toggleTitle = this.toggleTitle.bind(this);
    this.toggleDescription = this.toggleDescription.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  toggleTitle() {
    let title = this.state.isSubmitted ? this.state.title : this.props.title;
    this.setState({
      editTitle: !this.state.editTitle,
      title,
      description: this.props.description,
      isSubmitted: false,
      editDescription: false
    });
  }

  toggleDescription() {
    let description = this.state.isSubmitted
      ? this.state.description
      : this.props.description;
    this.setState({
      editDescription: !this.state.editDescription,
      description,
      title: this.props.title,
      isSubmitted: false,
      editTitle: false
    });
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit(e) {
    let name = e.target.name;
    if (e.key === "Enter") {
      this.setState(
        {
          isSubmitted: true
        },
        () => {
          this.props.updateList({
            title: this.state.title,
            boardId: this.props.boardId,
            listId: this.props.listId,
            description: this.state.description
          });
          if (name === "title") {
            this.toggleTitle();
          } else {
            this.toggleDescription();
          }
        }
      );
    }
  }

  render() {
    const {
      title,
      description,
      cards,
      deleteList,
      listId,
      boardId,
      handleSubmitCard,
      updateCard,
      deleteCard,
      users
    } = this.props;
    return (
      <Card className="my-2">
        <CardBlock>
          <CardTitle>
            {!this.state.editTitle
              ? <span onClick={this.toggleTitle}>{this.state.title}</span>
              : <NameEdit
                  toggleTitle={this.toggleTitle}
                  title={this.state.title}
                  onChange={this.onChange}
                  onSubmit={this.onSubmit}
                />}
            {" "}

          </CardTitle>
          <CardSubtitle style={{ marginBottom: "30px" }}>
            <DeleteListButton onClick={deleteList({ listId, boardId })} />

            <div>
              {!this.state.editDescription
                ? <span onClick={this.toggleDescription}>
                    {this.state.description}
                  </span>
                : <DescriptionEdit
                    toggleDescription={this.toggleDescription}
                    description={this.state.description}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                  />}
            </div>
          </CardSubtitle>
          <Cards
            cards={cards}
            listTitle={title}
            updateCard={updateCard}
            boardId={boardId}
            deleteCard={deleteCard}
            users={users}
          />
          <CreateCard
            handleSubmitCard={handleSubmitCard}
            boardId={boardId}
            listId={listId}
          />

        </CardBlock>
      </Card>
    );
  }
}
export default List;
