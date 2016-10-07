class Card < ApplicationRecord
  belongs_to :list
  has_many :members, foreign_key: 'user_id', class_name: 'User'
  has_many :activities
end
