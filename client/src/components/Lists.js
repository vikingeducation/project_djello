import React from "react";
import { CardDeck } from "reactstrap";

import List from "./List";

const listGroup = ({
  lists,
  deleteList,
  currentBoard,
  updateList,
  handleSubmitCard,
  updateCard,
  deleteCard,
  users
}) =>
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
        handleSubmitCard={handleSubmitCard}
        updateCard={updateCard}
        deleteCard={deleteCard}
        users={users}
      />
    );
  });

class Lists extends React.Component {
  render() {
    const {
      currentBoard,
      deleteList,
      updateList,
      handleSubmitCard,
      updateCard,
      deleteCard,
      users
    } = this.props;
    const lists = currentBoard.Lists;
    return (
      <CardDeck>

        {lists.length
          ? listGroup({
              lists,
              currentBoard,
              deleteList,
              updateList,
              handleSubmitCard,
              updateCard,
              deleteCard,
              users
            })
          : <p>No Lists...</p>}
      </CardDeck>
    );
  }
}
export default Lists;
