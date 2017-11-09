# {
#   board: {
#    current: { id, title, list_ids}
#     board_list: [{id, title}],
#     lists: {id: {board_id, title, description, card_ids}}
#     cards: {id: { title, description, list_id}}
#   }
# }

# json.current @board.id, @board.title, @board.list_ids

json.current @board, :id, :title, :list_ids