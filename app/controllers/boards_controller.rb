class BoardsController < ApplicationController

  def index
    @boards = Board.all
    respond_to do |format|
      format.json { render json: @boards, status: 200 }
    end
  end

  def create
    @board = Board.new(board_params)
    if @board.save
      respond_to do |format|
        format.json { render json: @board, status: 200 }
      end
    end
  end

  def update
  end

  def destroy
  end

  private
    def board_params
      params.require(:board).permit(:title, :description)
    end
end
