class ListsController < ApplicationController

  before_action :require_current_user

  def create

    @list = current_user.lists.build(list_params)

    if @list.save
      flash.now[:success] = 'List successfully created!'
      respond_to do |format|
        format.json { render json: @list.to_json, :status => 201 }
      end
    else
      flash.now[:danger] = 'List failed to be created'
      respond_to do |format|
        format.json { render nothing: true, :status => 422 }
      end
    end

  end

  def update

    @list = List.find_by_id(params[:id])

    if @list.update(list_params)
      respond_to do |format|
        format.json { render :nothing => :true, :status => 200 }
      end
    else
      respond_to do |format|
        format.json { render :nothing => :true, :status => 422 }
      end
    end

  end

  def destroy

    @list = List.find_by_id(params[:id])

    if @list && @list.destroy
      flash.now[:success] = 'List successfully deleted!'
      respond_to do |format|
        format.json { render :nothing => :true, :status => 204 }
      end
    else
      flash.now[:danger] = 'List failed to be deleted'
      respond_to do |format|
        format.json { render :nothing => :true, :status => 422 }
      end
    end

  end

  private

  def list_params
    params.require(:list).permit(:title, :description, :board_id)
  end

  def require_current_user

    list = List.find_by_id(params[:id])
    unless list.nil? || list.board.owner == current_user
      flash.now[:danger] = 'Unauthorized Access!'
      respond_to do |format|
        format.json { render nothing: true, :status => 401 }
      end
    end

  end
  
end
