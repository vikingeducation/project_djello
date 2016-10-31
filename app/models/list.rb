class List < ApplicationRecord
  belongs_to :board
  belongs_to :user
  has_many :cards, dependent: :destroy
  has_many :activities, dependent: :destroy

end
