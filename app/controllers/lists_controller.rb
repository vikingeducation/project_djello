class ListsController < ApplicationController

  def create
    @list = List.new(title: "Click to add title", description: "Click to add description")
    @list.user = current_user
    @list.board = Board.find(params[:boardId])
    if @list.save
      respond_to do |format|
        format.json { render json: @list, status: 201 }
      end
    end
  end

  def update
    @list = List.find(params[:id])
    if @list.update(list_params)
      respond_to do |format|
        format.json {render json: @list, status: 200}
      end
    end

  end

  def destroy
    @list = List.find(params[:id])
    if @list.destroy
      respond_to do |format|
        format.json {render json: @list, status: 200}
      end
    end

  end

  private

  def list_params
    params.require(:list).permit(:title, :description)
  end
end
