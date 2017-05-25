class CardMembership < ApplicationRecord
  belongs_to :card
  belongs_to :user
  validates_uniqueness_of :user_id, scope: [:card_id]
end
