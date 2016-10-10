class Card < ActiveRecord::Base
  belongs_to :list
  
  has_many :card_users
  has_many :users, through: :card_users
end
