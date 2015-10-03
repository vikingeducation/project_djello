class Board < ActiveRecord::Base
  has_many :lists,
            dependent: :destroy

  has_many :user_boards, 
            foreign_key: :board_id,
            dependent: :destroy

  has_many :members, 
            through: :user_boards,
            source: :member

end
