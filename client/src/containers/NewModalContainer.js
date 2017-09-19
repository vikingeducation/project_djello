import { connect } from "react-redux";
import React, { PureComponent } from "react";
import { Button } from "semantic-ui-react";

import { addBoard } from "../socket";

import NewModal from "../components/NewModal";

class NewModalContainer extends PureComponent {
  state = {
    title: "",
    open: false
  };

  handleClose = () => this.setState({ open: false });
  handleOpen = () => this.setState({ open: true });
  onChange = (e, { value }) => this.setState({ title: value });
  onCreate = () => {
    if (this.state.title.length) {
      this.props.onCreate(this.state.title);
      this.setState({ title: "", open: false });
    }
  };

  render() {
    return (
      <span>
        <Button {...this.props.buttonProps} onClick={this.handleOpen}>
          {this.props.buttonText}
        </Button>
        <NewModal
          {...this.state}
          onChange={this.onChange}
          onCreate={this.onCreate}
          onClose={this.handleClose}
        />
      </span>
    );
  }
}

const handlerMap = {
  board: addBoard
};

const mapStateToProps = (state, ownProps) => ({
  buttonProps: ownProps.buttonProps,
  buttonText: ownProps.buttonText
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onCreate: title => dispatch(handlerMap[ownProps.type](title))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewModalContainer);
