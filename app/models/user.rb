class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :rememberable

  has_many :boards

  has_many :team_users
  has_many :teams, through: :team_users

  has_many :card_users
  has_many :cards, through: :card_users
end
