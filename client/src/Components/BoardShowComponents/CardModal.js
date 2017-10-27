import React from "react";
import { connect } from "react-redux";

//components
import Editable from "../Editable";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import Paper from "material-ui/Paper";
import { Card, CardHeader, CardText, CardActions } from "material-ui/Card";
import { ListItem } from "material-ui/List";
import Dialog from "material-ui/Dialog";

const paperStyle = {
  margin: 5,
  height: "100%",
  width: "100%"
};
const style = {
  width: "100px",
  height: "100px",
  border: "1px solid red",
  margin: "10px"
};

class CardModal extends React.Component {
  constructor(props) {
    super(props);
    const {
      title,
      description,
      activity,
      comments,
      members,
      _id,
      labels
    } = this.props;
    this.state = {
      open: false,
      title,
      description,
      activity,
      comments,
      members,
      _id,
      labels
    };
  }

  //material-ui modal methods
  onClose = e => {
    //user cancelled,
    //reset the state
    const {
      title,
      description,
      activity,
      comments,
      members,
      _id,
      labels
    } = this.props;
    this.setState({
      open: false,
      title,
      description,
      activity,
      comments,
      members,
      _id,
      labels
    });
  };
  onSave = e => {
    //save the local changes
    this.props.edit({
      title: this.state.title,
      description: this.state.description,
      activity: this.state.activity,
      comments: this.state.comments,
      members: this.state.members,
      labels: this.state.labels
    });
    this.setState({ open: false });
  };
  onOpen = e => {
    this.setState({ open: true });
  };
  onLocalEdit = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { edit } = this.props;
    const actions = [
      <RaisedButton
        onClick={e => {
          this.onClose(e);
        }}
        label="Cancel"
      />,
      <RaisedButton
        onClick={e => {
          this.onSave(e);
        }}
        label="Save"
      />
    ];
    return (
      <Paper onClick={this.onOpen} style={style}>
        <ListItem hoverColor="none" primaryText={this.state.title}>
          {/* MODAL */}
          <Dialog
            title={this.state.title}
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.onClose}
            autoScrollBodyContent={true}
          >
            <Card>
              <CardHeader
                title={
                  <Editable name="title" onSubmit={this.onLocalEdit}>
                    <h3>{this.state.title}</h3>
                  </Editable>
                }
                subtitle="Best Card Ever"
              />
              <CardText>
                <Paper>
                  <h5>Description</h5>
                  <Editable name="description" onSubmit={this.onLocalEdit}>
                    <p>{this.state.description || "None"}</p>
                  </Editable>
                </Paper>
                <Paper>
                  <h5>Members</h5>
                  <Editable name="members" onSubmit={this.onLocalEdit}>
                    <p>{this.state.members || "None"}</p>
                  </Editable>
                </Paper>
                <Paper>
                  <h5>Activity</h5>
                  <Editable name="activity" onSubmit={this.onLocalEdit}>
                    <h5>{this.state.activity || "None"}</h5>
                  </Editable>
                </Paper>
              </CardText>
              <CardActions>
                <div>Such actions here</div>
                <FlatButton label="do things" />
                <FlatButton label="do things" />
                <FlatButton label="do things" />
              </CardActions>
            </Card>
          </Dialog>
        </ListItem>
      </Paper>
    );
  }
}
export default CardModal;
