import React from 'react'
import Header from './Header'

const App = ({ user }) => {
  console.log('App ', user)
  if (user.isFetching) {
    return (<div>Loading...</div>)
  }
  return (
    <div>
    	<Header user={user} />
    	
    </div>)
}

export default App