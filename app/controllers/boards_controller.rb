class BoardsController < ApplicationController
  before_action :authenticate_user!

  def index
    @boards = current_user.boards
    respond_to do |format|
      format.json { render json: @boards.to_json }
    end
  end

  def create
    @board = current_user.boards.build(board_params)
    respond_to do |format|
      if @board.save
        format.json { render json: @board }
      else
        format.json { render status: :unprocessable_entity }
      end
    end
  end

  def destroy
  end

  private

  def board_params
    params.require(:board).permit(:title, :description)
  end

end
