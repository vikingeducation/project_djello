class Board < ApplicationRecord
  has_many :board_memberships
  has_many :users, 
           through: :board_memberships
  has_many :lists
  has_many :cards, through: :lists
end
