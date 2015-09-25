class Board < ActiveRecord::Base

  belongs_to :user
  has_many :lists

  default_scope { includes(:lists) }

end
