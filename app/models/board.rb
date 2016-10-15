class Board < ApplicationRecord
  belongs_to :author, foreign_key: 'user_id', class_name: 'User'

  # Join table for members.
  has_many :board_memberships
  has_many :members, through: :board_memberships, source: :member

  has_many :lists
end

# I can be a member of a Board.
# I can be a member of multiple Boards.
# I can see both the Boards I've made as well as the Boards of which I'm a member.



# FROM users JOIN boards ON users.board_id = boards.id
