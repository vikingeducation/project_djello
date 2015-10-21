class ListsController < ApplicationController

  before_action :require_current_user


  def create
    @list = current_user.listss.build(list_params)

    if @list.save
      flash.now[:success] = 'New list created!'
      respond_to do |format|
        format.json { render json: @list.to_json, :status => 201 }
      end
    else
      flash.now[:danger] = 'Sorry, there was an error. Please try again.'
      respond_to do |format|
        format.json { render nothing: true, :status => 422 }
      end
    end
  end


  private

    def list_params
      params.require(:list).permit(:title, :board_id)
    end

    def require_current_user
      list = List.find_by_id(params[:id])
      unless list.nil? || list.owner == current_user
        flash.now[:danger] = "You're not authorized to do this!"
        respond_to do |format|
          format.json { render :nothing => :true, :status => 401 }
        end
      end
    end


end
