class ListsController < ApplicationController
  before_action :authenticate_user!
  before_action :require_author , only: [:create]
  before_action :require_owner, only: [:update, :destroy]

  def create
    @list = List.new(list_whitelist_params)
    if @list.save
      respond_to do |format|
        format.json { render json: @list }
      end
    end
  end

  def update
    binding.pry
    @list = List.find(params[:id])
    if @list.update(list_whitelist_params)
      respond_to do |format|
        format.json {render json: @list}
      end
    end
  end

  private
    def list_whitelist_params
      params.require(:list).permit(:title, :description, :board_id)
    end
    def require_author
      unless params[:list] and Board.where(user: current_user).pluck(:id).include? (params[:list]["board_id"])
        respond_to do |format|
         format.json {render json: {errors: ["You must be the owner of this content!"]}, status: 403}
        end
      end
    end

    def require_owner
      unless  Board.where(user: current_user).pluck(:id).include? List.find(params[:id]).board_id
        respond_to do |format|
          format.json {render json: {errors: ["You must be the owner of this content!"]}, status: 403}
        end
      end
    end
end
