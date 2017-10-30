class ListsController < ApplicationController

  def update
    @list = List.where(id: params[:id]).first
    return head :not_found if @list.blank?
    return head :bad_request unless params[:list]
    if @list.update(whitelisted_params)
      render :show
    end
  end

  private

  def whitelisted_params
    params.require(:list).permit(:title, :description, :id, :board_list)
  end
end
