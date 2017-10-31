import React from 'react'
import EditInPlace from './EditInPlace'
import CardContainer from '../containers/CardContainer'

const List = ({ list, updateList }) => {

  const { id, title, description, card_ids, board_id } = list

  const cards = card_ids.map(card_id => {
    return (<CardContainer key={`CardContainer-${card_id}`} id={card_id} />)
  })

  return (
    <div className="list-item border">
    <EditInPlace name="title" text={title} tag="h3" onSubmit={updateList} placeholder="Add a title..." id={id} />
    <EditInPlace name="description" text={description} tag="p" onSubmit={updateList} type="textarea" placeholder="Add a description..." id={id} />
    </div>
  )
}

export default List