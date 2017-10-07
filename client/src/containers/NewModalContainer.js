import React, { PureComponent } from "react";

import NewModal from "../components/NewModal";

class NewModalContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      open: false
    };
  }

  handleClose = () => this.setState({ open: false });
  handleOpen = () => this.setState({ open: true });
  onChange = (e, { value }) => this.setState({ title: value });
  onCreate = () => {
    if (this.state.title.length) {
      this.props.onCreate(this.state.title);
      this.setState({ title: "", open: false });
    }
  };

  actions = {
    handleClose: this.handleClose,
    onChange: this.onChange,
    onCreate: this.onCreate,
    handleOpen: this.handleOpen
  };

  info = () => ({
    buttonText: this.props.buttonText,
    buttonProps: this.props.buttonProps || {},
    modalTitle: this.props.title,
    ...this.state
  });

  render() {
    return <NewModal actions={this.actions} info={this.info()} />;
  }
}

export default NewModalContainer;
