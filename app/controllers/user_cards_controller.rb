class UserCardsController < ApplicationController

  def create
    member = User.find_by_id(params[:user_id])
    user_card = UserCard.new(card_id: user_card_params[:card_id],
                             user_id: user_card_params[:user_id],
                             role: 'participator')

    respond_to do |format|

      if user_card.save
        format.json { render json: member }
      else
        format.json { render nothing: true, status: 400 }
      end

    end

  end

  def destroy
    member = User.find_by_id(user_card_params[:user_id])
    user_card = UserCard.where("user_id = ? AND card_id = ?", 
                                user_card_params[:user_id],
                                user_card_params[:card_id])[0]

    respond_to do |format|

      if user_card && user_card.destroy
        format.json { render json: member }
      else
        format.json { render nothing: true, status: 400 }
      end

    end

  end

  private

  def user_card_params
    params.permit(:user_id, :card_id)
  end

end
