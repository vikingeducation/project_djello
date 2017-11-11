class Card < ApplicationRecord
  belongs_to :list
  has_one :board, through: :list
  has_many :memberships, dependent: :destroy
  has_many :members, through: :memberships, source: :user
  has_one :owner, through: :board
  has_many :activities, dependent: :destroy

  validates :title, presence: true


end
