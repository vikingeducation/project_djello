import React from 'react'
import EditInPlace from './EditInPlace'
import CardContainer from '../containers/CardContainer'
import Confirmation from './Confirmation'

const List = ({
  list,
  updateList,
  deleteList,
  id
}) => {

  const { title, description, card_ids, board_id } = list

  const cards = card_ids.map(card_id => {
    return (<CardContainer key={`CardContainer-${card_id}`} id={card_id} />)
  })

  return (
    <div className="list-item">
    <EditInPlace name="title" text={title} tag="h3" onSubmit={updateList} placeholder="Add a title..." id={id} />
    <EditInPlace name="description" text={description} tag="p" onSubmit={updateList} type="textarea" placeholder="Add a description..." id={id} />
    {cards}
    <Confirmation buttonLabel="Delete List" confirmationLabel="Delete" confirmationAction={deleteList}>
    Delete list "{title}"?
    </Confirmation>
    </div>
  )
}

export default List