import React from "react";
import Dialog from "material-ui/Dialog";
// import FlatButton from 'material-ui/FlatButton';
// import RaisedButton from 'material-ui/RaisedButton';
import Paper from "material-ui/Paper";

const paperStyle = {
  margin: 5
};

class Card extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }
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
      title,
      description,
      activity,
      comments,
      members,
      labels
    } = this.props;
    return (
      <div onClick={this.onOpen}>
        <Dialog
          title={title}
          // actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.onClose}
        >
          <div>
            <h5>{title}</h5>
            <div>
              <h5>description</h5>
              <p>{description}</p>
              {/* <Editable name="description" onSubmit={edit} text={description}>
                <h5>{description}</h5>
              </Editable> */}
            </div>
            <div>
              <h5>members</h5>
              <p>{members}</p>
            </div>
            <div>
              <h5>activity</h5>
              <p>{activity}</p>
            </div>
          </div>
        </Dialog>
        <Paper style={paperStyle}>
          <p>{this.props.title}</p>
        </Paper>
      </div>
    );
  }
}
// const Card = props => {
//   return (
//     <div>
//       <Dialog
//         title={prop.title}
//         // actions={actions}
//         modal={true}
//         open={this.state.open}
//         onRequestClose={this.handleClose}
//       >
//         The actions in this window were passed in as an array of React objects.
//       </Dialog>
//       <Paper style={paperStyle}>
//         <p>{props.title}</p>
//       </Paper>
//     </div>
//
//   );
// };

export default Card;
