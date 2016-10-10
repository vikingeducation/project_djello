class UsersController < ApplicationController

  def index
    @users = Card.find_by_id(params[:card_id]).users
    if @users
      respond_to do |format|
        format.json { render json: @users, status: 200 }
      end
    end
  end

end
