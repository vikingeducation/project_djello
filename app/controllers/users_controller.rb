class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    @users = User.all
    respond_to do |format|
      format.json {render json: @users}
    end
  end
end
