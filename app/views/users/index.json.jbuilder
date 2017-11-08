json.id @user.id
json.name @user.full_name
json.default_board_id @user.most_recent_board, :id unless @user.most_recent_board.blank?
