class BoardsController < ApplicationController

  def index
    @boards = Board.all
  end

  def create
    @board = Board.new(params_list)

    if @board.save
      puts "Saved board"
      
    end
  end


  private

  def params_list
    param.require(:board).permit(:title, :user_id, :id)
  end
end
