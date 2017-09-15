import React from "react";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      text: ""
    };
  }

  handleText = e => this.setState({ text: e.target.value });

  handleButton = () =>
    this.props.createBoard({
      title: this.state.text,
      username: this.props.user.username
    });

  render() {
    console.log(this.props);
    const style = {
      height: 300,
      width: "90%",
      margin: "5%",
      textAlign: "center",
      display: "flex"
    };
    return (
      <Paper style={style} zDepth={2}>
        <form style={{ width: "100%" }}>
          <TextField
            floatingLabelText="Board name"
            onChange={this.handleText}
          />
          <FlatButton
            label="Create"
            fullWidth={true}
            primary={true}
            onClick={this.handleButton}
          />
        </form>
      </Paper>
    );
  }
}

export default Form;
