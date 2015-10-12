class List < ActiveRecord::Base
  belongs_to :board
  has_many :cards,
            dependent: :destroy

  validates :name, :board_id, presence: true
  validates :name, length: { in: 1..20 }

end
