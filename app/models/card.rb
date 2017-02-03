class Card < ApplicationRecord
  belongs_to :list
  has_many :members, dependent: :destroy
  has_many :card_members, through: :members, :source => :user
end
