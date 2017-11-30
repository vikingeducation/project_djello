import React, { Component } from "react";
import PropTypes from "prop-types";

class EditableField extends Component {
  constructor(props) {
    super(props);

    this.state = { show: false, text: "" };
    this.onClick = this.onClick.bind(this);
    this.onEnteredText = this.onEnteredText.bind(this);
    this.clickToHide = this.clickToHide.bind(this);
    this.saveText = this.saveText.bind(this);
    this.preventing = this.preventing.bind(this);
  }

  onClick() {
    console.log("SHOW");
    this.setState({
      show: !this.state.show,
      text: this.props.currentValue
    });
  }
  clickToHide(e) {
    console.log("hide????");
    if (this.state.show) {
      this.setState({ show: false });
    }
  }
  onEnteredText(event) {
    this.setState({ text: event.target.value });
  }
  saveText(event) {
    this.props.changeValue(
      this.props.currentValue,
      this.state.text,
      this.props.addtionalParmas
    );
    this.props.setCurrentValue(
      {
        target: { value: this.state.text }
      },
      this.props.indexCurrentValue
    );
    this.setState({ show: false });
  }
  preventing(event) {
    event.stopPropagation();
  }

  render() {
    let title = <p onClick={this.onClick}>{this.props.currentValue}</p>;

    if (this.state.show) {
      title = (
        <div onClick={this.preventing}>
          <input onChange={this.onEnteredText} value={this.state.text} />
          <button onClick={this.saveText}>Save</button>
          <button onClick={this.clickToHide}>Cancel</button>
        </div>
      );
    }
    return <div>{title}</div>;
  }
}

EditableField.propTypes = {
  currentValue: PropTypes.string.isRequired,
  changeValue: PropTypes.func.isRequired,
  setCurrentValue: PropTypes.func.isRequired,
  addtionalParmas: PropTypes.node,
  indexCurrentValue: PropTypes.node
};
//<EditableField currentValue={string} changeValue={func} setCurrentValue={func} />
export default EditableField;
