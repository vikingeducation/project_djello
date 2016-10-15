class Board < ActiveRecord::Base
  belongs_to :user
  has_many :lists


  def self.all_with_user(user)
    boards = user.boards

    Card.all.each do |card|
      if card.members.include?(user)
        board = card.list.board
        boards.push(board)
      end
    end

    boards.uniq

  end


end
