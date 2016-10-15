class UsersController < ApplicationController

  def index
    puts "getting users..."
    puts params
    @users = Card.find_by_id(params[:card_id]).users if params[:card_id]
    @users = User.all unless params[:card_id]
    p @users.to_json
    @users = @users.to_json
    if @users
      puts "responding..."
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
