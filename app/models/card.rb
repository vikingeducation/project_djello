class Card < ActiveRecord::Base
  belongs_to :list
  has_many :card_members
  has_many :users, through: :card_members
  has_many :activities
end
