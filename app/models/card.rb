class Card < ApplicationRecord
  belongs_to :list
  has_many :members
  has_many :users, through: :members
end
