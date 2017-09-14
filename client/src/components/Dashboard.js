import React from "react";
import AppBar from "material-ui/AppBar";
import Boards from "./Boards";
import FlatButton from "material-ui/FlatButton";

const Dashboard = ({ logOut, user }) => {
  console.log(user);
  return (
    <div>
      <AppBar
        title="Djello"
        iconElementRight={
          <div>
            <h1>
              Welcome, {user.firstName}!
            </h1>
            <FlatButton label="Log Out" onClick={logOut} />
          </div>
        }
      />
      <Boards />
    </div>
  );
};

export default Dashboard;
