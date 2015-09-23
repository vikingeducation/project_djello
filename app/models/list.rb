class List < ActiveRecord::Base
  belongs_to :board
  has_many :cards
  # belongs_to :user, through: :board

  def user
    self.board.user
  end
end
