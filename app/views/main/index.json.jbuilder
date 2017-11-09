# {
#   board: {
#    current: { id, title, list_ids}
#     board_list: [{id, title}],
#     lists: {id: {board_id, title, description, card_ids}}
#     cards: {id: { title, description, list_id}}
#   }
# }

#  json.current @current_board, :id, :title, :list_ids

json.current do 
  json.id @current_board.id
  json.title @current_board.title
  json.list_ids @current_board.list_ids
  json.board_members @current_board.board_members do |m|
    json.id m.id
    json.name m.full_name
  end
end

json.board_list do 
  json.array! @user.boards.sort_by(&:title), :id, :title, :updated_at
end

json.lists @current_board.lists, :id, :title, :description, :board_id, :card_ids

json.cards @current_board.cards do |card|
  json.id card.id
  json.title card.title
end

json.all_users User.all do |u|
  json.id u.id
  json.name u.full_name
end 


