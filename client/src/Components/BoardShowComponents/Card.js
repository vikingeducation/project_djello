import React from "react";
import { connect } from "react-redux";

//components
import Editable from "../Editable";
import RaisedButton from "material-ui/RaisedButton";
import Paper from "material-ui/Paper";
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

class Card extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }

  //material-ui modal methods
  onClose = e => {
    //things
    console.log("closing");
    this.setState({ open: false });
  };
  onOpen = e => {
    console.log("opening");
    this.setState({ open: true });
  };
  render() {
    const {
      onClose,
      edit,
      title,
      description,
      activity,
      comments,
      members,
      _id,
      labels
    } = this.props;
    const actions = [
      <RaisedButton onClick={() => {}} label="Cancel" />,
      <RaisedButton onClick={() => {}} label="Submit" />
    ];
    return (
      <Paper onClick={this.onOpen} style={style}>
        <ListItem hoverColor="none" primaryText={title}>
          {/* MODAL */}
          <Dialog
            title={title}
            actions={actions}
            modal={false}
            open={this.state.open}
            overlayStyle={{ backgroundColor: "green" }}
            onRequestClose={this.onClose}
            autoScrollBodyContent={true}
          >
            <div>
              <h5>{title}</h5>
              <div>
                <h5>description</h5>
                <Editable name="description" onSubmit={edit}>
                  <h5>{description}</h5>
                </Editable>
              </div>
              <div>
                <h5>members</h5>
                <Editable name="members" onSubmit={edit}>
                  <p>{members}</p>
                </Editable>
              </div>
              <div>
                <h5>activity</h5>
                <Editable name="activity" onSubmit={edit}>
                  <h5>{activity}</h5>
                </Editable>
              </div>
            </div>
          </Dialog>
        </ListItem>
      </Paper>
    );
  }
}
export default Card;
