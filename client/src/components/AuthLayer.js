import React from 'react';
import Login from './Login';

const AuthLayer = ({isAuthenticated, loginUser, authError}) => {
  if (!isAuthenticated) {
    return <Login loginUser={loginUser} error={authError}/>
  }

  return (
    <div>
      You're logged in!!!!
    </div>
  )
};

export default AuthLayer;