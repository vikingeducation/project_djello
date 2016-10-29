class Card < ApplicationRecord
  belongs_to :list
  has_many :members, dependent: :destroy
  has_many :users, through: :members
end
