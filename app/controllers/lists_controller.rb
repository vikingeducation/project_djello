class ListsController < ApplicationController

  def index
    board = Board.find(params[:board_id])
    @lists = board.lists
    respond_to do |format|
      format.json { render json: @lists.to_json }
    end
  end

  def create
    @list = List.new(list_params)
    respond_to do |format|
      if @list.save
        format.json { render json: @list }
      else
        format.json { render status: :unprocessable_entity }
      end
    end
  end

  def update
    @list = List.find(params[:id])
    respond_to do |format|
      if current_user.lists.includes(@list) && @list.update(list_params)
        format.json { render json: @list }
      else
        format.json { render status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @list = List.find(params[:id])
    respond_to do |format|
      if @list.destroy
        format.json { head :no_content }
      end
    end
  end

  private

  def list_params
    params.require(:list).permit(:title, :description, :board_id)
  end

end
