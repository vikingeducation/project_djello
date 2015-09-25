class ListsController < ApplicationController
  before_action :authenticate_user!
  before_action :require_author , only: [:create]
  before_action :require_owner, only: [:update, :destroy]

  def create
    @list = List.new(list_whitelist_params)
    if @list.save
      respond_to do |format|
        format.json { render json: @list.to_json(include: :cards) }
      end
    end
  end

  def update
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
      board_id = params[:list]["board_id"].to_i
      unless params[:list] and (current_user.board_ids.include? board_id or current_user.can_view? board_id)
        respond_to do |format|
         format.json {render json: {errors: ["You must be the owner of this content!"]}, status: 403}
        end
      end
    end

    def require_owner
      board_id = List.find(params[:id]).board_id
      unless  Board.where(user: current_user).pluck(:id).include? board_id or current_user.can_view? board_id
        respond_to do |format|
          format.json {render json: {errors: ["You must be the owner of this content!"]}, status: 403}
        end
      end
    end
end
