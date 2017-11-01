class List < ApplicationRecord
  belongs_to :board
  has_many :cards, dependent: :destroy
  has_many :memberships, through: :cards, dependent: :destroy

  validates :title, presence: true
end
