import React from "react";
import Header from "./Header";
import LoginForm from "./LoginForm";
import DashboardContainer from "../containers/DashboardContainer";

const App = ({ user, loginUser }) => {
  return (
    <div>
      <Header />
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
