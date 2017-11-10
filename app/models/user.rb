class User < ApplicationRecord
  has_many :boards, dependent: :destroy
  has_many :lists, through: :boards
  has_many :cards, through: :lists
  has_many :memberships
  has_many :all_cards, through: :memberships, source: :card
  has_many :board_memberships, dependent: :destroy
  has_many :all_boards, through: :board_memberships, source: :board


  has_secure_password

  def full_name
    self.first_name + ' ' + self.last_name
  end

  def most_recent_board
    self.all_boards.order('updated_at DESC').first
  end


end
