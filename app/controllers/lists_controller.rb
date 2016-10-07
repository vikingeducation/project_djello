class ListsController < ApplicationController
  def index
    @lists = List.where("board_id = ?", params[:board_id])
    respond_to do |format|
      format.json { render json: @lists, status: 200 }
    end
  end

  def create
    puts params
    board = Board.find_by_id(params[:board_id])
    @list = board.lists.build(list_params)
    if @list.save 
      respond_to do |format|
        format.json {render json: @list, status: 200 }
      end
    end
  end



  private

  def list_params
    params.require(:list).permit(:title, :description)
  end

end
