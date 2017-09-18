import { withRouter } from "react-router-dom";

const Protected = ({ condition, children, exclusion, location }) => {
  if (condition && exclusion !== location.pathname) return children;
  return null;
};

export default withRouter(Protected);
