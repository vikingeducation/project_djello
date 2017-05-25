class Card < ApplicationRecord
  belongs_to :list
  has_many :card_memberships, dependent: :destroy
  has_many :users, 
           through: :card_memberships
  has_many :activities, dependent: :destroy
end
