class Card < ActiveRecord::Base

  belongs_to :list
  has_many :memberships
  has_many :members, through: :memberships, source: :user
  default_scope { includes(:members)}
end
