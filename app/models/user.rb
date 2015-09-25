class User < ActiveRecord::Base
  has_many :boards
  has_many :card_members
  has_many :cards, through: :card_members
  has_many :activities
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
