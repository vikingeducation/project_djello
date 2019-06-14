import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setInputfieldShow } from "../actions";

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
    this.props.setInputfieldShow(true);
  }
  clickToHide(e) {
    console.log("hide????");
    if (this.state.show) {
      this.setState({ show: false });
    }
    this.props.setInputfieldShow(false);
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

  componentWillReceiveProps(nextProps) {
    if (this.props.inputField && !nextProps.inputField) {
      this.setState({ show: false });
    }
  }

  render() {
    let title = <p onClick={this.onClick}>{this.props.currentValue}</p>;

    if (this.state.show && this.props.inputField) {
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

const mapStateToProps = state => {
  return {
    inputField: state.inputField
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setInputfieldShow: booleanValue => {
      dispatch(setInputfieldShow(booleanValue));
    }
  };
};

EditableField.propTypes = {
  currentValue: PropTypes.string.isRequired,
  changeValue: PropTypes.func.isRequired,
  setCurrentValue: PropTypes.func.isRequired,
  addtionalParmas: PropTypes.node,
  indexCurrentValue: PropTypes.node
};
//<EditableField currentValue={string} changeValue={func} setCurrentValue={func} />
export default connect(mapStateToProps, mapDispatchToProps)(EditableField);
