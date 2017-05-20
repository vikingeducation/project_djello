class BoardMembershipsController < ApplicationController

  def create
    @membership = BoardMembership.new(membership_params)
    @membership.user_id = params[:user_id] ? params[:user_id] : current_user.id
    respond_to do |format|
      if @membership.save
        format.json { render json: @membership.to_json }
      else
        puts "something went wrong"
        format.json { render status: :unprocessable_entity }
      end
    end
  end

  def index
    board = Board.find(params[:board_id])
    @members = board.users
    respond_to do |format|
      format.json { render json: @members.to_json }
    end
  end

  private

  def membership_params
    params.require(:board_membership).permit(:user_id, :board_id)
  end
end
