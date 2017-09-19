import React, { Component } from "react";
import { connect } from "react-redux";

import { BoardsActions } from "../actions";
import BoardContainer from "./BoardContainer";
import DropDownBoards from "../components/DropDownBoards";
import { Grid, Row, Col } from "react-flexbox-grid";

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: [],
      currBoard: null
    };
  }

  componentWillMount() {
    this.props.loggedInOnly();
    const { boardsGet } = this.props;
    boardsGet();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      boards: nextProps.BoardsReducers.boardsData.filter(board =>
        board.users.includes(this.props._id)
      )
    });
  }

  onBoardChange = (e, index, value) => {
    console.log("currBoard: ", this.state.currBoard);
    this.setState({
      currBoard: value
    });
  };

  render() {
    return (
      <Grid fluid>
        <br />
        <Row>
          <Col lg={3} lgOffset={9}>
            <DropDownBoards
              onBoardChange={this.onBoardChange}
              boards={this.state.boards}
              currBoard={this.state.currBoard}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <BoardContainer board={this.state.currBoard} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    BoardsReducers: state.BoardsReducers
  };
};

const mapDispatchToProps = dispatch => ({
  boardsGet: () => {
    dispatch(BoardsActions.boardsGet());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
