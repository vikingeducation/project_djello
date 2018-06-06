import React, { Component, PropTypes } from 'react'  
import { reduxForm } from 'redux-form'  
import { connect } from 'react-redux'

import Board from './Board';

import { boardCreate } from './actions'

// Our validation function for `name` field.
const titleRequired = value => (value ? undefined : 'Name Required')

class BoardContainer extends Component {  

	submit = (board) => {
		const { client, boardCreate, reset } = this.props
		boardCreate(client, board)
		reset()
	}

	  renderTitleInput = ({ input, type, meta: { touched, error } }) => (
    <div>
      {/* Spread RF's input properties onto our input */}
      <input
        {...input}
        type={type}
      />
      {/*
        If the form has been touched AND is in error, show `error`.
        `error` is the message returned from our validate function above
        which in this case is `Name Required`.

        `touched` is a live updating property that RF passes in.  It tracks
        whether or not a field has been "touched" by a user.  This means
        focused at least once.
      */}
      {touched && error && (
        <div style={{ color: '#cc7a6f', margin: '-10px 0 15px', fontSize: '0.7rem' }}>
          {error}
        </div>
        )
      }
    </div>
  )


	render() {

		const { handleSubmit, invalid, board } = this.props;

		return (
			<Board 
				titleRequired={titleRequired}
				handleSubmit={handleSubmit}
				invalid={invalid}
        board={board}
				renderTitleInput={this.renderTitleInput}
				submit={this.submit}
			/>
		)
	}

}

// Pull in both the Client and the Board state
const mapStateToProps = state => ({  
  client: state.client,
  board: state.board,
})

// Make the Client and Board available in the props as well
// as the boardCreate() function
const connected = connect(mapStateToProps, { boardCreate })(BoardContainer)  
const formed = reduxForm({  
  form: 'board',
})(connected)

export default formed  