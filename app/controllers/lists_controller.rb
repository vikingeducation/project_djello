class ListsController < ApplicationController


  def create
    @list = current_user.lists.build(list_params)

    respond_to do |format|
      if @list.save
        format.json { render json: @list.to_json }
      else
        format.json { render status: :unprocessable_entity}
      end
    end
  end



  private

  def list_params 
    params.require(:list).permit(:title, :description, :board_id)
  end


end
