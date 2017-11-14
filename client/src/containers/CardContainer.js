import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SortableElement } from 'react-sortable-hoc'
import ListCard from '../components/ListCard'
import { loadCard, updateCard, removeCardMember, addCardMember, deleteCard, updateCardList } from '../actions/cardActions'
import serialize from 'form-serialize'

const mapStateToProps = (state, props) => {
  return {
    card: state.board.cards[props.id], // title only
    details: state.card.details[props.id] || {},
    board: state.board,
    list_id: props.list_id,
    id: props.id,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadCard: () => {
      dispatch(loadCard(ownProps.id))
    },
    editCard: (form) => {
      const data = serialize(form, { hash: true })
      dispatch(updateCard(data, ownProps.id))
    },
    markIncomplete: (e) => {
      e.preventDefault()
      dispatch(updateCard({ done: false }, ownProps.id))
    },
    changeList: (form) => {
      const data = serialize(form, { hash: true })
      dispatch(updateCardList(data, ownProps.id, ownProps.list_id))
    },
    removeMember: (member_id) => {
      dispatch(removeCardMember(ownProps.id, member_id))
    },
    addMember: (form) => {
      const data = serialize(form, { hash: true })
      if (data) {
        dispatch(addCardMember(ownProps.id, data))
      }
    },
    deleteCard: () => {
      dispatch(deleteCard(ownProps.list_id, ownProps.id))
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(SortableElement(ListCard))