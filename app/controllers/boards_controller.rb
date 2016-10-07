class BoardsController < ApplicationController

  def index
    # Boolean to check if only asking for current user's boards.
    @boards = current_user.boards
    respond_to do |format|
      format.json { render json: @boards.to_json(include: :user), status: 200 }
    end
  end

  def show
    @board = Board.find_by_id(params[:id].to_i)
    respond_to do |format|
      format.json { render json: @board.to_json(include: :user), status: 200 }
    end
  end

  def create
    @board = current_user.boards.build(board_params)
    if @board.save
      respond_to do |format|
        format.json { render json: @board, status: 200 }
      end
    end
  end

  def update
  end

  def destroy
    @board = Board.find_by_id(params[:id].to_i)
    if @board.destroy
      respond_to do |format|
        format.json { head :no_content }
      end
    end
  end

  private
    def board_params
      params.require(:board).permit(:title, :description)
    end
end
