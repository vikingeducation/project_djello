class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :boards
  has_many :lists
  has_many :cards
  has_many :memberships
  has_many :member_cards, :through => :memberships, :class_name => "Card", :source => :card
  has_many :assigned_lists, :through => :member_cards, :source => :list, :class_name => "List"
  has_many :assigned_boards, :through => :member_cards, :source => :board, :class_name => "Board"
end
