class User < ApplicationRecord
  has_many :boards, dependent: :destroy
  has_many :lists, through: :boards
  has_many :cards, through: :lists
  has_many :memberships
  has_many :board_memberships, through: :cards, source: :memberships

  has_secure_password

  def full_name
    self.first_name + ' ' + self.last_name
  end

  def most_recent_board
    self.boards.order('updated_at DESC').first
  end

  def can_view(resource)
    viewable = false
    binding.pry
    case resource.class
    when Card
      viewable = true if resource.members.include?(self)
    when Board
      viewable = true if resource.owner == self
    end
    viewable
  end

end
