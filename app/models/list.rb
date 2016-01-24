class List < ActiveRecord::Base
  belongs_to :board
  has_many :cards

  validates :title, presence: true, allow_blank: false
  validates :description, presence: true, allow_blank: false
end
