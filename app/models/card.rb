class Card < ActiveRecord::Base
  belongs_to :list
  has_many :card_members
  has_many :users, through: :card_members

  def owner
    self.list.user
  end

  def board
    self.list.board
  end
end
