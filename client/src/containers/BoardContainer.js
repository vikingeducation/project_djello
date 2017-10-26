import React, { Component } from 'react'
import Board from '../components/Board'
import { connect } from 'react-redux'
import { loadDefaultBoard, updateBoard, deleteBoard } from '../actions/boardActions'
import serialize from 'form-serialize'

const mapStateToProps = (state) => {
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
    }

  }
}

class BoardContainer extends Component {

  componentDidMount() {
    this.props.loadDefaultBoard()
  }

  render() {
    return (<Board {...this.props} />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer)