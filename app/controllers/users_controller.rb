class UsersController < ApplicationController
  skip_before_action :authenticate_user, only: [:create]

  def index
    @user = current_user
  end

  def create
    @user = User.new(whitelisted_params)
    if @user.save
      @token = Knock::AuthToken.new(payload: { sub: @user.id}).token
      render :show
    else
      head :unprocessable_entity
    end
  end

  private

  def whitelisted_params
    params.require(:user).permit(:email, :password)
  end
end
