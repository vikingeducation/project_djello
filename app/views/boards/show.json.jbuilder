# {
#   current: ...,
#   lists: ...,
#   cards: ...,
# }


# json.current @board, :id, :title, :list_ids

json.current do 
  json.id @board.id
  json.title @board.title
  json.list_ids @board.list_ids
   json.board_members @board.board_members do |m|
    json.id m.id
    json.name m.full_name
  end
end



json.cards @board.cards do |card|
  json.id card.id
  json.title card.title
end

json.lists @board.lists, :id, :title, :description, :board_id, :card_ids

json.board_list @user.boards.sort_by(&:title), :id, :title
