class UsersController < ApplicationController
  respond_to :json

  def index
    @user = current_user
  end
end
