class Board < ActiveRecord::Base

  has_many :lists
  # has_many :cards, through: :lists
  default_scope { includes(:lists)}
  belongs_to :user

end
