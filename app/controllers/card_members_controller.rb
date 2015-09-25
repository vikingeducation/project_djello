class CardMembersController < ApplicationController

  def create
    @card_member = CardMember.new(whitelist_cm_params)

    respond_to do |format|
      if @card_member.save
        format.json { render json: @card_member.to_json( include: [:user, :card] ) }
      end
    end
  end

  def show
    @card_member = CardMember.find(params[:id])

    respond_to do |format|
      format.json { render json: @card_member.to_json( include: :user ) }
    end
  end

  def destroy
    @card_member = CardMember.find(params[:id])
    respond_to do |format|
      if @card_member.destroy
        format.json { render json: @card_member.to_json( include: :user ) }
      end
    end
  end

  private

  def whitelist_cm_params
    params.require(:card_member).permit(:user_id, :card_id)
  end
end
