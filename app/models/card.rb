class Card < ApplicationRecord
  belongs_to :author, foreign_key: 'user_id', class_name: 'User'
  belongs_to :list

  # Card memberships
  has_many :card_memberships
  has_many :members, through: :card_memberships, source: :member

end
