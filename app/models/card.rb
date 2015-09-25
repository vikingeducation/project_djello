class Card < ActiveRecord::Base
  belongs_to :list
  has_many :memberships
  has_many :users, through: :memberships

  default_scope { includes(:users) }
end
