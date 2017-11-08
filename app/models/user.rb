class User < ApplicationRecord
  has_many :boards, dependent: :destroy
  has_many :lists, through: :boards
  has_many :cards, through: :lists
  has_many :memberships
  has_many :board_memberships, dependent: :destroy

  has_secure_password

  def full_name
    self.first_name + ' ' + self.last_name
  end

  def most_recent_board
    self.boards.order('updated_at DESC').first
  end

end
