class ListsController < ApplicationController

  def index
    board = Board.find(params[:board_id])
    @lists = board.lists
    respond_to do |format|
      format.json { render json: @lists.to_json }
    end
  end

  def create
    @list = current_user.lists.build(list_params)
    respond_to do |format|
      if @list.save
        format.json { render json: @list }
      else
        format.json { render status: :unprocessable_entity }
      end
    end
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
