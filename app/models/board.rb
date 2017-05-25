class Board < ApplicationRecord
  has_many :board_memberships, dependent: :destroy
  has_many :users, 
           through: :board_memberships
  has_many :lists, dependent: :destroy
  has_many :cards, through: :lists
end
