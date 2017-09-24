import React from "react";
import TextField from "material-ui/TextField";

//TODO: ADD CENTERED TEXT INPUT

// const centerText = {
//   display: "flex",
//   textAlign: "center"
// };

class Editable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false
    };
  }
  onClick = e => {
    // console.log("you clicked me!");
    this.setState({ editMode: true });
  };
  //clicking away allows for resetting
  onBlur = e => {
    // console.log("value = ", e.target.value);
    if (e.target.value.length > 0) {
      this.setState({ editMode: false, text: e.target.value });
      this.props.onSubmit(e);
    } else {
      this.setState({ editMode: false });
    }
  };
  render() {
    if (this.state.editMode) {
      return (
        <TextField
          ref={input => {
            if (input) input.focus();
          }}
          name={this.props.name}
          onBlur={this.onBlur}
        />
      );
    } else {
      return (
        <div name={this.props.name} onClick={this.onClick}>
          {this.props.children}
        </div>
      );
    }
  }
}

export default Editable;
