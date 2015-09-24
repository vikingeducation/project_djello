class ListsController < ApplicationController

  def create
    @list = List.new(whitelist_list_params)
    # binding.pry
    @list.user_id = current_user.id

  end

  def destroy
    @list = List.find(params['id'])

    
  end

  private

  def whitelist_list_params
    params.require(:list).permit(:board_id, :title, :description)
  end

end
