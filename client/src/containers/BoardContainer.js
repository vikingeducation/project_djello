import React, { Component } from 'react'
import Board from '../components/Board'
import { connect } from 'react-redux'
import { loadBoard, updateBoard, deleteBoard, createBoard } from '../actions/boardActions'
import serialize from 'form-serialize'

const mapStateToProps = (state) => {
  console.log('state', state)
  return {
    board: state.board
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadBoard: () => {
      dispatch(loadBoard())
    },
    updateBoard: (form, board_id) => {
      const data = serialize(form, { hash: true })
      dispatch(updateBoard(data, board_id))
      form.reset()
    },
    deleteBoard: (id) => {
      dispatch(deleteBoard(id)).then(() => {
        dispatch(loadBoard())
      })
    },
    createBoard: () => {
      dispatch(createBoard())
    },
    selectBoard: (board_id) => {
      dispatch(loadBoard(board_id))
    }
  }
}

class BoardContainer extends Component {

  componentDidMount() {
    this.props.loadBoard()
  }

  componentWillReceiveProps(nextP) {
    // if (!nextP.board.current.id) {
    //   this.props.loadBoard()
    // }
  }


  render() {
    return (<Board {...this.props} />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer)