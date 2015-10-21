class Board < ActiveRecord::Base
  belongs_to :owner, :class_name => "User"
  has_many :lists
  has_many :cards, :through => :lists

  validates :title, presence: true, allow_blank: false
end
