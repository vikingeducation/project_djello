import React, { Component } from "react";
import PaperWrapper from "./PaperWrapper";
import { List, ListItem } from "material-ui/List";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

class BoardDashboard extends Component {
  constructor() {
    super();
    this.state = {
      formOpen: false,
      formValue: ""
    };
  }

  handleListName = (e, val) => this.setState({ formValue: val });

  handleAddList = () => this.setState({ formOpen: !this.state.formOpen });

  render() {
    return (
      <PaperWrapper>
        <div style={{ flexDirection: "column" }}>
          <h1>
            {this.props.board.title}
          </h1>
          <div style={{ flexDirection: "row" }}>
            <List>
              <ListItem onClick={this.handleAddList}>Add a list...</ListItem>
              {this.state.formOpen
                ? <div>
                    <TextField onChange={this.handleListName} />
                    <RaisedButton
                      label="Save"
                      primary={true}
                      onClick={() => addList(this.state.formValue)}
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

export default BoardDashboard;
