import React from "react";

const Showable = ({ condition, children }) => (condition ? children : null);

export default Showable;
