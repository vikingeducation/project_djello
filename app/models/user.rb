class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :boards
  has_many :lists
  # has_many :authored_cards, 
  #          foreign_key: 'user_id', 
  #          class_name: 'Card'
  has_many :card_memberships
  has_many :cards, through: :card_memberships
end
