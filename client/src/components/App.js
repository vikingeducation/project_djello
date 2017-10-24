import React from 'react'
import Header from './Header'

const App = (props) => {
  if (props.user.isFetching) {
    return (<div>Loading...</div>)
  }
  return (
    <div>
    	<Header {...props} />
    	
    </div>)
}

export default App