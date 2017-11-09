import React from 'react'
import EditInPlace from './EditInPlace'
import CardContainer from '../containers/CardContainer'
import Confirmation from './Confirmation'
import { Button } from 'reactstrap'
import CardCreator from './CardCreator'

const List = ({
  list,
  updateList,
  deleteList,
  createCard,
  id
}) => {

  const { title, description, card_ids, board_id } = list

  const cards = card_ids.map(card_id => {
    return (<CardContainer key={`CardContainer-${card_id}`} id={card_id} list_id={id}/>)
  })

  return (
    <div className="list-item">
  <Confirmation buttonLabel={<button type="button" className="close text-danger" aria-label="Close"><span aria-hidden="true" size="sm">&times;</span></button>} confirmationLabel="Delete" confirmationAction={deleteList} className="text-right">
    Delete list "{title}"?
    </Confirmation>

    <div className="clearfix"></div>
    <EditInPlace name="title" text={title} tag="h3" onSubmit={updateList} placeholder="Add a title..." id={id} />
    <EditInPlace name="description" text={description} tag="p" onSubmit={updateList} type="textarea" placeholder="Add a description..." id={id} />
    {cards}
    <CardCreator onSubmit={createCard}  />
    </div>
  )
}

export default List