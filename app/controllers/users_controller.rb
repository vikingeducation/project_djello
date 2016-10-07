class UsersController < ApplicationController

  def index
    @users = User.all
    respond_to do |format|
      format.json {render json: @users, status: 200}
    end
  end
end
