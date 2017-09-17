import React from "react";
import FlatButton from "material-ui/FlatButton";

const LogOutButton = ({ name, onClick }) =>
  <div>
    <h1>
      Welcome, {name}!
    </h1>
    <FlatButton label="Log Out" onClick={onClick} />
  </div>;

export default LogOutButton;
