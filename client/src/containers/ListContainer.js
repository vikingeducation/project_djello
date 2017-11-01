import React, { Component } from 'react'
import { connect } from 'react-redux'
import List from '../components/List'
import serialize from 'form-serialize'
import { updateList, deleteList } from '../actions/listActions'
import { createCard } from '../actions/cardActions'

const mapStateToProps = (state, props) => {
  console.log('list state', state)
  return {
    list: state.board.lists[props.id],
    error: state.list.error,
    // id: props.id,
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
    },
    createCard: (data) => {

      console.log('create card', ownProps.id)
      dispatch(createCard(data, ownProps.id))

    }
  }
}

class ListContainer extends Component {


  render() {
    return (<List {...this.props} />)
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)