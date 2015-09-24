class Board < ActiveRecord::Base

  belongs_to :owner, class_name: "User", foreign_key: :user_id

  has_many :lists
  has_many :cards, through: :lists
  has_many :card_memberships, through: :cards

  has_many :project_members, through: :card_memberships, source: :user

  default_scope { includes(:lists)}
end
