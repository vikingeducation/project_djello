import React, { Component } from 'react'
import { connect } from 'react-redux'
import List from '../components/List'
import serialize from 'form-serialize'
import { updateList } from '../actions/listActions'

const mapStateToProps = (state, props) => {
  console.log('ListContainer state', state)
  console.log('Listcontainer', state.board.lists[props.id])
  return {
    list: state.board.lists[props.id]
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log('ownProps', ownProps)
  return {
    updateList: (form, id) => {
      const data = serialize(form, { hash: true })
      dispatch(updateList({ list: data }, ownProps.id))
    }
  }
}

class ListContainer extends Component {
  shouldComponentUpdate(nextP, nextS) {
    console.log('nextP, nextS', nextP, nextS)
    return true

  }

  render() {
    return (<List {...this.props} />)
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)