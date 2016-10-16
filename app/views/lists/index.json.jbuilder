json.(@lists) do |list|
  json.id list.id
  json.title list.title
  json.description list.description
  json.board_id list.board_id

  json.cards list.cards do |card|
    json.id card.id
    json.title card.title
    json.text card.text
    json.list_id card.list_id
    json.completed card.completed

    json.users card.users do |user|
      json.email user.email
      json.id user.id
    end
  end

end