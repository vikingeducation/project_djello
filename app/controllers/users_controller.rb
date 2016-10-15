class UsersController < ApplicationController

  def index
    @users = Card.find_by_id(params[:card_id]).users
    if @users
      respond_to do |format|
        format.json { render json: @users, status: 200 }
      end
    end
  end

  def update
    @card = Card.find_by_id(params[:card_id])
    @card.members = params[:members]
    if @card.save
      respond_to do |format|
        format.json { render json: @card, status: 200 }
      end
    end
  end

end
