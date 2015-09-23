class ListsController < ApplicationController

  def create
    @list = List.new(params_list)
    respond_to do |format|
      if @list.save
        format.json {render json: @list}
      else
        format.json {render status: :unprocessable_entity}
      end
    end
  end

  def update
    @list = List.find(params["id"])
    respond_to do |format|
      if @list.update(params_list)
        format.json {render json: @list}
      else
        format.json {render status: :unprocessable_entity}
      end
    end

  end

  private

  def params_list
    params.require(:list).permit(:title, :board_id, :id, :description)
  end
end
