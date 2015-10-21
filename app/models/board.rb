class Board < ActiveRecord::Base
  belongs_to :owner, :class_name => "User"
  has_many :lists

  validates :title, presence: true, allow_blank: false
end
