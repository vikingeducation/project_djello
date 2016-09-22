class Card < ActiveRecord::Base

  belongs_to :list
  delegate :board, to: :list
  delegate :owner, to: :board

  has_many :card_memberships, :dependent: :destroy
  has_many :members, through: :card_memberships, source: :user

end
