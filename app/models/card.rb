class Card < ActiveRecord::Base
  belongs_to :list
  has_many :activities,
            dependent: :destroy

  has_many :user_cards, 
            foreign_key: :card_id,
            dependent: :destroy

  has_many :members, 
            through: :user_cards, 
            source: :member

  validates :name, :content, :list_id, presence: true
  validates :name, length: { in: 1..20 }
  validates :content, length: { in: 1..100 }

  def board
    list.board
  end

end
