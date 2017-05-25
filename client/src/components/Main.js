import React from "react";
import Logout from "./Logout";

const Main = ({ onLogoutClick }) => {
  return (
    <div>
      <h1>Hello</h1>
      <Logout onLogoutClick={onLogoutClick} />
    </div>
  );
};

export default Main;
