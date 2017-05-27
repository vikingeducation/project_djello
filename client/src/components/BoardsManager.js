import React from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import CreateBoard from "./CreateBoard";
import DeleteBoardButton from "./DeleteBoardButton";

const dropBoards = (boards, changeCurrentBoard, currentBoard) => {
  return boards.filter(board => board.name !== currentBoard.name).map(board => {
    return (
      <DropdownItem
        onClick={changeCurrentBoard(boards)}
        value={board.name}
        key={board.id}
      >
        {board.name}
      </DropdownItem>
    );
  });
};

class BoardsManager extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  render() {
    const {
      boards,
      currentBoard,
      changeCurrentBoard,
      deleteBoard,
      handleSubmitBoard
    } = this.props;
    return (
      <div style={{ display: "inline-block", marginTop: "10px" }}>

        {boards && boards.length
          ? <ButtonDropdown
              isOpen={this.state.dropdownOpen}
              toggle={this.toggle}
            >
              <DropdownToggle caret>
                {currentBoard.name}
              </DropdownToggle>
              <DropdownMenu>
                {dropBoards(boards, changeCurrentBoard, currentBoard)}
              </DropdownMenu>
            </ButtonDropdown>
          : null}
        <CreateBoard handleSubmitBoard={handleSubmitBoard} />
        {boards && boards.length
          ? <DeleteBoardButton onClick={deleteBoard(currentBoard.id)} />
          : null}

      </div>
    );
  }
}

export default BoardsManager;
