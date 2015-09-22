class Board < ActiveRecord::Base

  has_many :lists
  belongs_to :user

end
