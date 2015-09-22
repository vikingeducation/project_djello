class BoardsController < ApplicationController

  def index
    @boards = Board.where(user_id: current_user.id)
    render json: @boards
  end

  def create
    @board = Board.new(board_params)

    respond_to do |format|

      if @board.save
        format.json { render @board }
      else
        format.json { render nothing: true, status: 400 }
      end
    end
  end

  def show
  end

  private

  def board_params
    params.require(:board).permit(:name, :user_id)
  end
  
end
