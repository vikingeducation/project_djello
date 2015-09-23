class Card < ActiveRecord::Base
  belongs_to :list

  def owner
    self.list.user
  end

  def board
    self.list.board
  end
end
