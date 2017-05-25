class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :board_memberships, dependent: :nullify
  has_many :boards, through: :board_memberships
  has_many :card_memberships, dependent: :nullify
  has_many :cards, through: :card_memberships
  has_many :activities, dependent: :nullify
end
