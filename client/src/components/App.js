import React from "react";
import LoginForm from "./LoginForm";
import DashboardContainer from "../containers/DashboardContainer";

const App = ({ user, loginUser }) => {
  return (
    <div className="App">
      {user.username ? (
        <DashboardContainer />
      ) : (
        <LoginForm
          onSubmit={e => {
            e.preventDefault();
            loginUser(e.target.email.value, e.target.password.value);
          }}
        />
      )}
    </div>
  );
};

export default App;
