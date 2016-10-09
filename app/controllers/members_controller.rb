class MembersController < ApplicationController
  def create
    @card = Card.find_by_id(member_params[:card_id])
    @member = @card.members.build(member_params)
    if @member.save
      respond_to do |format|
        format.json { render json: @member, status:200 }
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
