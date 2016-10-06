class ListsController < ApplicationController

  def create
    @list = List.new(title: "Add title...", description: "Add description...")
    @list.user = current_user
    @list.board = Board.find(params[:board_id])
    if @list.save
      respond_to do |format|
        format.json { render json: @list, status: 201 }
      end
    end
  end

  def update

  end

  def destroy

  end
end
