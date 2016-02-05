class UsersController < ApplicationController

  def index

    # ensures that current_user is always the user at the front of the array
    @users = User.all_other_users(current_user)
    @users.unshift(current_user)

    respond_to do |format|
      format.json { render json: @users.to_json, :status => 200 }
    end

  end
  
end
