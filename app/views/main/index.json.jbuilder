# {
#   board: {
#    current: { id, title, list_ids}
#     board_list: [{id, title}],
#     lists: {id: {board_id, title, description, card_ids}}
#     cards: {id: { title, description, list_id}}
#   }
# }

json.current @current_board, :id, :title, :list_ids

json.board_list do 
json.array! @user.boards.sort_by(&:title), :id, :title, :updated_at
end

json.lists @current_board.lists, :id, :title, :description, :board_id, :card_ids

json.cards @current_board.cards do |card|
  json.id card.id
  json.title card.title
end
