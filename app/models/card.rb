class Card < ActiveRecord::Base
  belongs_to :list
  has_many :card_members
  has_many :members, through: :card_members,
                     source: :user

  def owner
    self.list.user
  end

  def board
    self.list.board
  end

  def not_members
    User.all - self.members
  end
end
