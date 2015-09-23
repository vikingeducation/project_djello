class List < ActiveRecord::Base
  belongs_to :board
  # belongs_to :user, through: :board

  def user
    self.board.user
  end
end
