import React, { Component } from 'react'
import Board from '../components/Board'
import { connect } from 'react-redux'
import { loadDefaultBoard, updateBoard, deleteBoard, createBoard } from '../actions/boardActions'
import serialize from 'form-serialize'

const mapStateToProps = (state) => {
  console.log('state', state)
  return {
    board: state.board
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadDefaultBoard: () => {
      dispatch(loadDefaultBoard())
    },
    updateBoard: (form, board_id) => {
      const data = serialize(form, { hash: true })
      dispatch(updateBoard(data, board_id))
      form.reset()
    },
    deleteBoard: (id) => {
      dispatch(deleteBoard(id))
    },
    createBoard: () => {
      dispatch(createBoard())
    }
  }
}

class BoardContainer extends Component {

  componentDidMount() {
    this.props.loadDefaultBoard()
  }

  componentWillReceiveProps(nextP) {
    console.log('NextP', nextP)
    if (this.props.board.current.id !== nextP.board.current.id) {
      this.props.loadDefaultBoard()
    }
  }


  render() {
    return (<Board {...this.props} />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer)