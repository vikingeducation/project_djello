class Card < ApplicationRecord
  belongs_to :list
  has_one :board, through: :list
  has_many :memberships
  has_many :members, through: :memberships, source: :user
  has_one :owner, through: :list, source: :user
end
