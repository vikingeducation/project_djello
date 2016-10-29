class MembersController < ApplicationController

  def create
    @member = Member.new(member_params)
    @user = User.find(params[:member][:user_id])
    respond_to do |format|
      if @member.save
        format.json { render json: @user }
      end
    end
  end

  def destroy

    @member = Member.find_by(user_id: params[:user_id], card_id: params[:card_id])
    respond_to do |format|
      if @member.destroy
        format.json { render json: @member }
      else
        format.json { render status: :unprocessable_entity }
      end
    end
  end


private

  def member_params
    params.require(:member).permit(:user_id, :card_id)
  end

end
