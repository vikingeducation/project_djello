class MembershipsController < ApplicationController
  before_action :authenticate_user!
  before_action :require_access
  def create
    @card = Card.find_by_id(params[:card_id].to_i)
    @new_member = User.find_by_id(params[:user_id].to_i)

    if @card.members.push(@new_member)
      respond_to do |format|
        format.json { render json: @new_member }
      end
    end
  end
  private
    def require_access
      if !(current_user.owned_card_ids.include? params[:card_id].to_i)
        respond_to do |format|
          format.json {render json: {errors: ["You must be the owner of this content!"]}, status: 403}
        end
      elsif !User.find_by_id(params[:user_id].to_i)
        respond_to do |format|
          format.json {render json: {errors: ["Specified user does not exist"]}, status: 403}
        end
      end
    end
end
