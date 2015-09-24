class Card < ActiveRecord::Base
  belongs_to :list
  has_many :activities,
            dependent: :destroy

  def owner
    self.list.user
  end

  def board
    self.list.board
  end

  def members
    self.board.members
  end

end
