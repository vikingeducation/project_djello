class Board < ActiveRecord::Base
  has_many :lists
  belongs_to :user

  has_many :cards, through: :lists
  has_many :members, class_name: "User", through: :cards



end
