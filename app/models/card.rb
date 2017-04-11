class Card < ApplicationRecord
  belongs_to :list
  # belongs_to :user
  has_many :card_memberships
  has_many :users, 
           through: :card_memberships
end
