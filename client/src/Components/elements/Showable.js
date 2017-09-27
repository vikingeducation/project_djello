import React from "react";

//TODO: CHANGE THIS TO LOADING OR SOMETHING
const Showable = ({ isFetching, loadScreen, children }) => {
  loadScreen = loadScreen || <p>Loading...</p>;
  if (isFetching) {
    return <div>{loadScreen}</div>;
  }

  return <div>{children}</div>;
};

export default Showable;
//
// const Showable = ({ show, children }) => {
//   if (show) return children;
//   return null;
// };
