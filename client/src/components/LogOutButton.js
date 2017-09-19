import React from "react";
import FlatButton from "material-ui/FlatButton";

const style = {
  textAlign: "center",
  display: "flex",
  alignSelf: "center",
  color: "white"
};

const LogOutButton = ({ name, onClick }) =>
  <FlatButton style={style} label="Log Out" onClick={onClick} />;

export default LogOutButton;
