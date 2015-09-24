class ListsController < ApplicationController

  def create
    @list = List.create(whitelist_list_params)

    respond_to do |format|
      if @list.save
        format.json {render json: @list}
      else
        format.json {render status: :unprocessable_entity}
      end
    end

  end

  def update
    @list = List.find(params[:id])
    if @list.update(whitelist_list_params)
      respond_to do |format|
        format.json { render json: @list }
      end
    end
  end

  def destroy
    @list = List.find(params['id'])

    respond_to do |format|
      if @list.destroy
        @lists = List.all
        format.json { render json: @lists }
      else
        format.json { render status: :unprocessable_entity }
      end
    end
  end

  private

  def whitelist_list_params
    params.require(:list).permit(:board_id, :title, :description)
  end

end
