class ListsController < ApplicationController

  def index
    board = Board.find(params[:board_id])
    @lists = board.lists
    respond_to do |format|
      format.json { render json: @lists.to_json }
    end
  end

  def create
  end

  def update
  end

  def destroy
  end

  private

  def list_params
    params.require(:list).permit(:title, :description, :board_id)
  end

end
