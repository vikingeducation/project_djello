class Card < ActiveRecord::Base

  belongs_to :list

  has_many :card_members
  has_many :members, :through => :card_members, :class_name => 'User'

  validates :title, presence: true, allow_blank: false
  validates :description, presence: true, allow_blank: false
  
end
