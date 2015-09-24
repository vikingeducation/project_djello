class Card < ActiveRecord::Base
  validates :title, presence: true
  has_and_belongs_to_many :lists

  has_many :memberships
  has_many :members, through: :memberships, source: :user
  default_scope { includes(:members) }
end
