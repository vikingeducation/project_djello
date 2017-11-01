import React from 'react'
import { connect } from 'react-redux'
import ListCard from '../components/ListCard'

const mapStateToProps = (state, props) => {
  console.log('card container state', state.board.cards[props.id])
  return {
    card: state.board.cards[props.id],
    className: 'hanky'
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    createCard() => {

    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ListCard)