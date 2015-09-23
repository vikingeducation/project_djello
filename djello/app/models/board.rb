class Board < ActiveRecord::Base

  has_many :lists
  default_scope { includes(:lists)}
  belongs_to :user

end
