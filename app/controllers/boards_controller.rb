class BoardsController < ApplicationController


  def index
    @user = current_user
    @board = current_user.most_recent_board.includes()

  end
end
