import React from 'react'
import EditInPlace from './EditInPlace'

const List = ({
  list,
  updateList
}) => {
  const { id, title, description, card_ids, board_id } = list

  return (
    <div className="list-container">
    <EditInPlace name="title" text={title} tag="h3" onSubmit={updateList} placeholder="Add a title..." id={id} />
    <EditInPlace name="description" text={description} tag="p" onSubmit={updateList} type="textarea" placeholder="Add a description..." id={id} />
    </div>
  )
}

export default List