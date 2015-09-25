class UsersController < ApplicationController

  def index
    respond_to do |format|
      if current_user
        @users = User.all
        format.json { render json: @users.to_json }
      else
        format.json { render :status => 401, :json => { :success => false,
                                                        :info => "Login Credentials Failed" } }
      end

    end
  end
end
