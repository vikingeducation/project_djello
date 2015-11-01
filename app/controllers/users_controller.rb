class UsersController < ApplicationController

  def index
    # Keep current_user index 0 for front end
    @users = User.all_other_users(current_user)
    @users.unshift(current_user);

    respond_to do |format|
        format.json { render json: @users.to_json, :status => 200 }
    end
  end

end
