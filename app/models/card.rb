class Card < ActiveRecord::Base
  belongs_to :list
  has_many :activities,
            dependent: :destroy

  has_many :user_cards, foreign_key: :card_id,
                         dependent: :destroy
  has_many :members, through: :user_cards, source: :member

  def owner
    self.list.user
  end

  def board
    self.list.board
  end

  # def members
  #   self.board.members
  # end

end
