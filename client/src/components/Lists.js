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
  users,
  addMember,
  deleteMember
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
        addMember={addMember}
        deleteMember={deleteMember}
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
      users,
      addMember,
      deleteMember
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
              users,
              addMember,
              deleteMember
            })
          : <p>No Lists...</p>}
      </CardDeck>
    );
  }
}
export default Lists;
