import React from "react";
import {
  Card,
  Button,
  CardTitle,
  CardDeck,
  CardSubtitle,
  CardBlock,
  CardText,
  InputGroup,
  InputGroupButton,
  Input
} from "reactstrap";
import Cards from "./Cards";
import DeleteListButton from "./DeleteListButton";

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
      description: props.description
    };
    this.toggleTitle = this.toggleTitle.bind(this);
    this.toggleDescription = this.toggleDescription.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  toggleTitle() {
    this.setState({
      editTitle: !this.state.editTitle,
      title: this.props.title,
      description: this.props.description
    });
  }

  toggleDescription() {
    this.setState({
      editDescription: !this.state.editDescription,
      description: this.props.description,
      title: this.props.title
    });
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit(e) {
    if (e.key === "Enter") {
      this.props.updateList({
        title: this.state.title,
        boardId: this.props.boardId,
        listId: this.props.listId,
        description: this.state.description
      });
      if (e.target.name === "title") {
        this.toggleTitle();
      } else {
        this.toggleDescription();
      }
    }
  }

  render() {
    const {
      title,
      description,
      cards,
      deleteList,
      listId,
      boardId
    } = this.props;
    return (
      <Card className="my-2">
        <CardBlock>
          <CardTitle>
            {!this.state.editTitle
              ? <span onClick={this.toggleTitle}>{title}</span>
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
                ? <span onClick={this.toggleDescription}>{description}</span>
                : <DescriptionEdit
                    toggleDescription={this.toggleDescription}
                    description={this.state.description}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                  />}
            </div>
          </CardSubtitle>
          <Cards cards={cards} />
          <Button>Add A Card</Button>

        </CardBlock>
      </Card>
    );
  }
}
const listGroup = ({ lists, deleteList, currentBoard, updateList }) =>
  lists.map(list => {
    return (
      <List
        key={list.id}
        title={list.title}
        description={list.description}
        cards={list.Cards}
        deleteList={deleteList}
        listId={list.id}
        boardId={currentBoard.id}
        updateList={updateList}
      />
    );
  });

class Lists extends React.Component {
  render() {
    const { currentBoard, deleteList, updateList } = this.props;
    const lists = currentBoard.Lists;
    return (
      <CardDeck>

        {lists.length
          ? listGroup({ lists, currentBoard, deleteList, updateList })
          : <p>No Lists...</p>}
      </CardDeck>
    );
  }
}
export default Lists;
