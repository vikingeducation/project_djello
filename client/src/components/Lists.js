import React from "react";
import {
  Card,
  Button,
  CardTitle,
  CardDeck,
  CardSubtitle,
  CardBlock,
  CardText
} from "reactstrap";
import Cards from "./Cards";
import DeleteListButton from "./DeleteListButton";

const NameEdit = ({ toggle, title, onChangeTitle, updateList }) => {
  return (
    <div>
      <form onSubmit={updateList}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={onChangeTitle}
        />
        <button type="submit" onClick={toggle}>Save</button>

      </form>
      <button onClick={toggle}>Cancel</button>
    </div>
  );
};

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = { edit: false, title: props.title };
    this.toggle = this.toggle.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
  }
  toggle() {
    this.setState({
      edit: !this.state.edit
    });
  }
  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  render() {
    const {
      title,
      description,
      cards,
      deleteList,
      listId,
      boardId,
      updateList
    } = this.props;
    return (
      <Card className="my-2">
        <CardBlock>
          <CardTitle>
            {!this.state.edit
              ? <span onClick={this.toggle}>{title}</span>
              : <NameEdit
                  toggle={this.toggle}
                  title={this.state.title}
                  onChangeTitle={this.onChangeTitle}
                  updateList={updateList({
                    title: this.state.title,
                    boardId,
                    listId
                  })}
                />}
            {" "}

          </CardTitle>
          <CardSubtitle style={{ marginBottom: "30px" }}>
            <DeleteListButton onClick={deleteList({ listId, boardId })} />

            <CardText>{description}</CardText>
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
