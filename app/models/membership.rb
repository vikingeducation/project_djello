class Membership < ApplicationRecord
  belongs_to :card
  belongs_to :user

  validates :user, uniqueness: {scope: :card, message: 'user cannot have more than one membership to the same card'}
end
