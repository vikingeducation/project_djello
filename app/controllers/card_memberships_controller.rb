class CardMembershipsController < ApplicationController

  def create
    @membership = CardMembership.new(membership_params)
    @membership.user_id = get_user_id
    respond_to do |format|
      if @membership.save
        format.json { render json: @membership.to_json }
      else
        puts "card membership failure"
        format.json { render status: :unprocessable_entity }
      end
    end
  end

  def index
    card = Card.find(params[:card_id])
    @members = card.users
    respond_to do |format|
      format.json { render json: @members.to_json }
    end
  end

  def destroy
    @membership = CardMembership.find_by(user_id: params[:user_id], card_id: params[:card_id])
    @membership.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private

  def membership_params
    params.require(:card_membership).permit(:card_id, :user_id)
  end

  def get_user_id
    params[:card_membership][:user_id] ? params[:card_membership][:user_id] : current_user.id
  end

end
