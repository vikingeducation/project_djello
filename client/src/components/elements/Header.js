import React from "react";
import PropTypes from "prop-types";
import Showable from "./Showable";

const Header = ({ left, right, children }) => (
  <div className="conatiner conatiner-fluid header">
    <div className="row">
      <div className="col-6">
        <Showable show={!!left}>
          <p className="">{left}</p>
        </Showable>
      </div>
      <div className="col-3">
        <Showable show={!!right}>
          <p className="">{right}</p>
        </Showable>
      </div>
      <div className="col-3">{children}</div>
    </div>
  </div>
);

Header.propTypes = {
  left: PropTypes.string,
  right: PropTypes.string,
  children: PropTypes.any
};

export default Header;
