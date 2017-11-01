class Board < ApplicationRecord
  belongs_to :owner, class_name: 'User', foreign_key: 'user_id'
  has_many :lists, dependent: :destroy
  has_many :cards, through: :lists
  has_many :members, through: :cards

  validates :title, presence: true
end
