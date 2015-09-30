class List < ActiveRecord::Base
  belongs_to :board
  has_many :cards,
            dependent: :destroy

  def user
    self.board.user
  end

  # def members
  #   self.board.members
  # end

end
