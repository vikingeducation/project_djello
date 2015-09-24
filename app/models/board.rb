class Board < ActiveRecord::Base
  has_many :lists
  belongs_to :user

  has_many :user_boards, foreign_key: :board_id
  has_many :members, through: :user_boards, source: :member
end
