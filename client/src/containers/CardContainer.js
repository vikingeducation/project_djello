import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListCard from '../components/ListCard'
import { loadCard, updateCard } from '../actions/cardActions'
import serialize from 'form-serialize'

const mapStateToProps = (state, props) => {
  console.log(state)
  return {
    card: state.board.cards[props.id], // title
    details: state.card.cards[props.id] || {},
    isFetching: state.card.isFetching,
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
      dispatch(updateCard({ card: data }, ownProps.id))
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(ListCard)