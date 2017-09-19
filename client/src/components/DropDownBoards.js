import React from "react";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";

// import { deepPurple100 } from "material-ui/styles/colors";
const style = {
  width: "200px"
};

export default class DropDownBoards extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const BoardItems = this.props.boards.map(board =>
      <MenuItem value={board} primaryText={board.title} key={board._id} />
    );
    return (
      <div>
        <DropDownMenu
          value={this.props.currBoard}
          onChange={this.props.onBoardChange}
          style={style}
        >
          <MenuItem value={this.props.currBoard} primaryText={"Select Board"} />
          {BoardItems}
        </DropDownMenu>
      </div>
    );
  }
}
