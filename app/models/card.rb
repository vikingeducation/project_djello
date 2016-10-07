class Card < ApplicationRecord
  belongs_to :user
  belongs_to :board
  belongs_to :list
  has_many :memberships
  has_many :members, :through => :memberships, :class_name => "User", :source => :user
end
