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
  <Confirmation buttonLabel={<button type="button" className="close text-danger" aria-label="Close"><span aria-hidden="true">&times;</span></button>} confirmationLabel="Delete" confirmationAction={deleteList} className="text-right">
    Delete list "{title}"?
    </Confirmation>

    <div className="clearfix"></div>
    <EditInPlace name="title" text={title} tag="h3" onSubmit={updateList} placeholder="Add a title..." id={id} />
    <EditInPlace name="description" text={description} tag="p" onSubmit={updateList} type="textarea" placeholder="Add a description..." id={id} />
    {cards}
    </div>
  )
}

export default List