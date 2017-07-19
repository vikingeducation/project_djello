import React from 'react';
import Login from './Login';

const AuthLayer = ({isAuthenticated, loginUser}) => {
  if (!isAuthenticated) {
    return <Login loginUser={loginUser}/>
  }

  return (
    <div>
      You're logged in!!!!
    </div>
  )
};

export default AuthLayer;