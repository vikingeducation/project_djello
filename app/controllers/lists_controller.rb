class ListsController < ApplicationController

  def update
    @list = List.where(id: params[:id]).first
    return head :not_found if @list.blank?
    return head :bad_request unless params[:list]
    if @list.update(whitelisted_params)
      render :show
    end
  end

  def create
    return head :bad_request if params[:list].blank?
    @board = Board.find(params[:board_id])
    @list = @board.lists.build(whitelisted_params)
    if @list.save
      render :show
    else
      return head :bad_request
    end
  end


  private

  def whitelisted_params
    params.require(:list).permit(:title, :description, :board_list)
  end
end
