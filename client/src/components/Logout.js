import React from "react";

const Logout = ({ onLogoutClick }) => {
  return (
    <button onClick={() => onLogoutClick()} className="btn btn-primary">
      Logout
    </button>
  );
};

export default Logout;
