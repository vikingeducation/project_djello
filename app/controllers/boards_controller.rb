class BoardsController < ApplicationController

  def index
    @boards = current_user.boards

    respond_to do |format|
      format.json { render json: @boards }
    end

  end


  def show
    @board = Board.find(params[:id])

    respond_to do |format|
      format.json { render json: @board }
    end

  end

  def create
    @board = current_user.boards.new(board_params)
    if @board.save

      respond_to do |format|
        format.json { render json: @board }
      end
    else 
      resond_to do |format|
        format.json {}
      end
    end

  end




  private

  def board_params
    params.require(:board).permit(:title, :description)
  end

end
