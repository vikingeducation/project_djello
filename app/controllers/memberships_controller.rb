class MembershipsController < ApplicationController

  def destroy
    @membership = Membership.where(user_id: params[:id], card_id: params[:card_id])
    return head :not_found unless @membership.present?
    if @membership.first.destroy
      return head :no_content
    else
      return head :unprocessable_entity
    end
  end

  def create
    # return :bad_request unless params[:user_id]
    @membership = Membership.new(user_id: params[:user_id], card_id: params[:card_id])
    if @membership.save
      render :show
    end
  end

  private

  def add_user_as_board_member
    @board_membership = BoardMembership.create!(user: @membership.user, board: @membership.card.board)
  end


end
