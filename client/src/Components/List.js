import React from "react";
import Card from "./Card";
import Editable from "../Components/Editable";
import Paper from "material-ui/Paper";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";

const style = {
  width: 300,
  margin: 20,
  textAlign: "center",
  display: "inline-block"
};
// //TODO: ONBLUR EMPTY OUT THE TEXTFIELD
// class List extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       editingMode: false
//     };
//   }
//   // onBlur = e => {
//   //   this.setState({ editingMode: false });
//   //   this.props.newCard();
//   // };
//   onSubmit = e => {
//     console.log("submitting", e.target);
//     // this.setState({ editingMode: false });
//     // this.props.newCard();
//   };
//   // onCreateCard = e => {
//   //   this.setState({ editingMode: true });
//   // };
//   render() {
//     const {
//       cards,
//       newCard,
//       deleteList,
//       deleteCard,
//       edit,
//       title,
//       description
//     } = this.props;
//     const cardComponents = cards.map(card => <Card key={card._id} {...card} />);
//     return (
//       <Paper style={style}>
//         <Editable name="title" onSubmit={edit} text={title}>
//           <h5>{title}</h5>
//         </Editable>
//         <Editable name="description" onSubmit={edit} text={description}>
//           <h5>{description}</h5>
//         </Editable>
//         <ul>{cardComponents}</ul>
//         {/* <FlatButton onClick={this.onCreateCard} label="New" /> */}
//         {/* <Showable show={this.state.editingMode}>
//           <div>
//             <h5>Editing Mode enabled</h5>
//             <TextField
//               ref={input => {
//                 if (input) input.focus();
//               }}
//               name="cardTitle"
//               onBlur={this.onBlur}
//             />
//           </div>
//         </Showable> */}
//         <Editable name="cardTitle" onSubmit={this.onSubmit}>
//           <FlatButton label="New" />
//         </Editable>
//         <div>
//           <FlatButton onClick={deleteList}>
//             <i className="material-icons">delete</i>
//           </FlatButton>
//         </div>
//       </Paper>
//     );
//   }
// }
const List = ({
  id,
  cards,
  newCard,
  deleteList,
  deleteCard,
  editList,
  editCard,
  title,
  description
}) => {
  const cardComponents = cards.map(card => (
    <Card
      key={card._id}
      {...card}
      list={id}
      edit={e => editCard(e, card._id, id)}
    />
  ));
  return (
    <Paper style={style}>
      <Editable name="title" onSubmit={editList} text={title}>
        <h5>{title}</h5>
      </Editable>
      <Editable name="description" onSubmit={editList} text={description}>
        <h5>{description}</h5>
      </Editable>
      <ul>{cardComponents}</ul>
      <Editable onSubmit={newCard}>
        <FlatButton label="New" />
      </Editable>
      <div>
        <FlatButton onClick={deleteList}>
          <i className="material-icons">delete</i>
        </FlatButton>
      </div>
    </Paper>
  );
};

export default List;
