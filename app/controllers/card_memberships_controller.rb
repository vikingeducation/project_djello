class CardMembershipsController < ApplicationController

  def create
    @membership = CardMembership.new(membership_params)
    respond_to do |format|
      if @membership.save
        format.json { render json: @membership.to_json }
      else
        format.json { render status: :unprocessable_entity }
      end
    end
  end

  def destroy
  end

  private

  def membership_params
    params.require(:card_membership).permit(:card_id, :user_id)
  end

end
