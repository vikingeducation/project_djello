class UsersController < ApplicationController

  def index
    @users = User.order(:created_at => :desc)
    respond_to do |format|
      format.json { render :json => resource_to_json, :status => 200 }
    end
  end

 private
  def set_user
    @user = User.find_by_id(params[:id])
    unless @user
      flash.now[:error] = 'Could not find user'
      respond_to do |format|
        format.json { render :json => user_errors , :status => 422 }
      end
    end
  end

  def user_errors
    if @user
      error = @user.errors.full_messages.to_json
    else
      error = flash.now[:error]
    end
    { :errors => error }
  end

  def resource_to_json
    resource = action_name == 'index' ? @users : @user
    resource.to_json
  end
end
