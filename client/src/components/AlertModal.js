import React from "react";

export default ({ loginFailureMessage }) =>
  <div style={{ width: "50%", height: 50, backgroundColor: "#FF5252" }}>
    <p
      style={{
        textAlign: "center",
        color: "white",
        fontSize: "20px",
        fontFamily: "Roboto"
      }}
    >
      {loginFailureMessage}
    </p>
  </div>;
