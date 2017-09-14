import React from "react";

const LoggedIn = ({ user, children }) => {
  if (!user) {
    return null;
  }
  return <div>{children}</div>;
};
export default LoggedIn;
