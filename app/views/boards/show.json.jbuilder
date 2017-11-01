# {
#   current: ...,
#   lists: ...,
#   cards: ...,
# }


json.current @board, :id, :title, :list_ids

json.cards @board.cards do |card|
  json.id card.id
  json.title card.title
end

json.lists @board.lists, :id, :title, :description, :board_id, :card_ids

json.board_list @user.boards.sort_by(&:title), :id, :title

