class MembersController < ApplicationController

  def create
    @member = Member.new(member_params)
    respond_to do |format|
      if @member.save
        format.json { render json: @member }
      end
    end
  end


private

  def member_params
    params.require(:member).permit(:user_id, :card_id)
  end

end
