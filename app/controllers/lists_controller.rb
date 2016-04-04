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



  def update
    @list = list.find(params[:id])

    respond_to do |format|
      if @list.update(list_params)
        format.json { render json: @list.to_json }
      else
        format.json { render json: @list.errors, status: :unprocessable_entity }
      end
    end
  end



  def destroy 
    @list = List.find(params[:id])

    respond_to do |format|
      @list.destroy
      format.json { render json: @list.to_json }
    end
  end



  private

  def list_params 
    params.require(:list).permit(:title, :description, :board_id)
  end


end
