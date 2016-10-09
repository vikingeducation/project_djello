class Card < ApplicationRecord
  belongs_to :list
  has_many :members, foreign_key: 'card_id', class_name: 'User'
  has_many :activities
end
