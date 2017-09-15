import React from "react";

const Showable = ({ showable, children }) => {
  showable ? { children } : null;
};
