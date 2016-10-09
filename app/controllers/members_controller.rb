class MembersController < ApplicationController
  def index
    @card = Card.find_by_id(params[:card_id])
    if @card
      @members = @card.members
      respond_to do |format|
        format.json { render json: @members, status: 200 }
      end
    end
  end

  def create
    @card = Card.find_by_id(member_params[:card_id])
    @member = User.find_by_username(member_params[:username])
    if @card.members << @member
      respond_to do |format|
        format.json { render json: @member, status: 200 }
      end
    end
  end

  def destroy
  end

  private

    def member_params
      params.require(:member).permit(
        :id,
        :card_id,
        :username
      )
    end
end
