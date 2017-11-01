import React from 'react'
import { connect } from 'react-redux'
import ListCard from '../components/ListCard'
import { loadCard } from '../actions/cardActions'
import serialize from 'form-serialize'

const mapStateToProps = (state, props) => {
  return {
    card: state.board.cards[props.id], // title
    details: state.card.cards[props.id] || {},
    id: props.id
  }

}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadCard: () => {
      dispatch(loadCard(ownProps.id))
    },
    editCard: (form) => {
      const data = serialize(form, { hash: true })
      console.log('edit description', data)
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ListCard)