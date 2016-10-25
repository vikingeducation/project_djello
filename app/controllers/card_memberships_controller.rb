class CardMembershipsController < ApplicationController

  def create
    @membership = CardMembership.new(membership_params)

    #render the user of the new membership
    @user = User.find(@membership.user_id)

    if @membership.save
      respond_to do |format|
        format.json { render json: @user }
      end
    else
      respond_to do |format|
        format.json {}
      end
    end
  end


  private

  def membership_params
    params.require(:card_membership).permit(:user_id, :card_id)
  end
end
