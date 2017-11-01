import React, { Component } from 'react'
import { connect } from 'react-redux'
import List from '../components/List'
import serialize from 'form-serialize'
import { updateList, deleteList } from '../actions/listActions'

const mapStateToProps = (state, props) => {
  return {
    list: state.board.lists[props.id],
    error: state.list.error,
    id: props.id
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateList: (form, id) => {
      const data = serialize(form, { hash: true })
      dispatch(updateList({ list: data }, ownProps.id))
    },
    deleteList: () => {
      dispatch(deleteList(ownProps.id))
    }
  }
}

class ListContainer extends Component {


  render() {
    return (<List {...this.props} />)
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)