class ListsController < ApplicationController
  def index
    @lists = List.where("board_id = ?", params[:board_id])
    respond_to do |format|
      format.json { render json: @lists, status: 200 }
    end
  end
end
