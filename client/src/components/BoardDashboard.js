import React, { Component } from "react";
import PaperWrapper from "./PaperWrapper";
import { List, ListItem } from "material-ui/List";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { connect } from "react-redux";
import { createList, getLists } from "../actions";

class BoardDashboard extends Component {
  constructor() {
    super();
    this.state = {
      formOpen: false,
      formValue: ""
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.props.getLists(this.props.board._id);
  }

  handleListName = (e, val) => this.setState({ formValue: val });

  handleAddList = () => this.setState({ formOpen: !this.state.formOpen });

  render() {
    const { createList } = this.props;
    return (
      <PaperWrapper>
        <div style={{ flexDirection: "column" }}>
          <h1>teset</h1>
          <div style={{ flexDirection: "row" }}>
            <List>
              <ListItem onClick={this.handleAddList}>Add a list...</ListItem>
              {this.state.formOpen
                ? <div>
                    <TextField onChange={this.handleListName} />
                    <RaisedButton
                      label="Save"
                      primary={true}
                      onClick={() =>
                        createList({
                          title: this.state.formValue,
                          board_id: this.props.board._id
                        })}
                    />
                  </div>
                : null}
            </List>
          </div>
        </div>
      </PaperWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state.board
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createList: listData => {
      dispatch(createList(listData));
    },
    getLists: board_id => {
      dispatch(getLists(board_id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardDashboard);
