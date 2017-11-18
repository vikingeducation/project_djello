# Boards/show.json.jbuilder
# {
#   current: ...,
#   lists: ...,
#   cards: ...,
# }


# json.current @board, :id, :title, :list_ids

json.board do 
  json.id @board.id
  json.title @board.title
  json.list_ids @board.list_ids
  # commented this bit out because we might be able to get rid of it
  #  json.board_members @board.board_members do |m|
  #   json.id m.id
  #   json.name m.full_name
  # end
  json.board_list do 
  json.array! @user.all_boards.sort_by(&:title), :id, :title
end
end



json.cards @board.cards do |card|
  json.id card.id
  json.title card.title
  json.member_ids card.member_ids
  json.position card.position
end

json.lists @board.lists, :id, :title, :description, :board_id, :card_ids



# json.board_list do 
#   json.array! @user.all_boards.sort_by(&:title), :id, :title
# end
json.users User.all do |u|
  json.id u.id
  json.name u.full_name
end 

