class Board < ApplicationRecord
  belongs_to :user
  has_many :lists, dependent: :destroy
  has_many :cards, dependent: :destroy
  has_many :activities, dependent: :destroy

end
