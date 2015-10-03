class Activity < ActiveRecord::Base
  belongs_to :card

  validates :card_id, :content, presence: true
  validates :content, length: { in: 1..100 }
end
