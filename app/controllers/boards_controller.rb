class BoardsController < ApplicationController

  def index
    @boards = Board.all

    respond_to do |format|
      format.json { render json: @boards.to_json }
    end

  end


  def create
    @board = Board.new(board_params)

    respond_to do |format|
      if @board.save
        format.json { render json: @board.to_json }
      else
        format.json { render status: :unprocessable_entity }
      end
    end
  end





  private

  def board_params
    params.require(:board).permit(:title, :description, :user_id)
  end


end
