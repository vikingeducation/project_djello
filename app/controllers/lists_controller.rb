class ListsController < ApplicationController
 before_action :set_list, :except => [:index, :create]

  def create
    @list = List.new(list_params)
    respond_to do |format|
      if @list.save
        flash.now[:error] = 'list created'
        format.json { render :json => resource_to_json, :status => 201 }
      else
        flash.now[:error] = 'list not created'
        format.json { render :json => list_errors, :status => 422 }
      end
    end
  end

  def update
    respond_to do |format|
      if @list.update(list_params)
        flash.now[:error] = 'list updated'
        format.json { render :json => resource_to_json, :status => 200 }
      else
        flash.now[:error] = 'list not updated'
        format.json { render :json => list_errors, :status => 422 }
      end
    end
  end

  def destroy
    respond_to do |format|
      if @list.destroy
        flash.now[:error] = 'list destroyed'
        format.json { render :json => @list, :status => 200 }
      else
        flash.now[:error] = 'list not destroyed'
        format.json { render :json => list_errors, :status => 422 }
      end
    end
  end

  private
  def set_list
    @list = List.find_by_id(params[:id])
    unless @list
      flash.now[:error] = 'Could not find board'
      respond_to do |format|
        format.json { render :json => list_errors , :status => 422 }
      end
    end
  end

  def list_params
    params.require(:list).permit(:title, :board_id)
  end

  def list_errors
    if @list
      error = @list.errors.full_messages.to_json
    else
      error = flash.now[:error]
    end
    { :errors => error }
  end

  def resource_to_json
    resource = action_name == 'index' ? @lists : @list
    resource.to_json(:include => :cards)
  end
end
