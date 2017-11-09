class Membership < ApplicationRecord
  belongs_to :card
  belongs_to :user
  after_create :create_board_membership

  include Reusable

  validates :user, uniqueness: {scope: :card, message: 'cannot have more than one membership to the same card'}
end
