class ListsController < ApplicationController
  before_action :authenticate_user!
  before_action :require_author
  def create
    @list = List.new(list_whitelist_params)
    if @list.save
      respond_to do |format|
        format.json { render json: @list }
      end
    end
  end

  private
    def list_whitelist_params
      params.require(:list).permit(:title, :description, :board_id)
    end
    def require_author
      binding.pry
      unless params[:list] and Board.where(user: current_user).pluck(:id).include? (params[:list]["board_id"])
        format.json {render json: {errors: ["You must be the owner of this content!"]}, status: 403}
      end
    end
end
