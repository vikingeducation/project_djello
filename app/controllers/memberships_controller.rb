class MembershipsController < ApplicationController

  def create
    @membership = Membership.create(whitelist_member_params)

    respond_to do |format|
      if @membership.save
        format.json {render json: @membership}
      else
        format.json {render status: :unprocessable_entity}
      end
    end

  end

  private

    def whitelist_member_params
      params.require(:membership).permit(:user_id, :card_id)
    end

end
