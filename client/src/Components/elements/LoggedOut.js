import React from "react";

const LoggedOut = ({ user, children }) => {
  if (user) {
    return null;
  }
  return <div>{children}</div>;
};
export default LoggedOut;
