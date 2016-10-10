class CardMembership < ApplicationRecord
  belongs_to :card
  belongs_to :member, foreign_key: :user_id, class_name: 'User'
end
