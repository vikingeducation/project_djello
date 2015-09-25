class MembersController < ApplicationController
  def index
    @users = User.all

    render json: @users
  end

  def members
    @board = Board.find(params[:id])
    @users = @board.members

    render json: @users
  end


  def not_members
    @board = Board.find(params[:id])

    @users = User.all - @board.members

    render json: @users
  end

  def add

    card_member = CardMember.new(member_params)

    if card_member.save
      @card = card_member.card
      render json: @card.to_json({include: [:members, :not_members] })
    else
      render json: {nothing: true}
    end
  end

  def remove

    card_member = CardMember.find_by(user_id: params[:user_id], card_id: params[:card_id])
    @card = card_member.card

    if card_member.destroy
      render json: @card.to_json({include: [:members, :not_members] })
    else
      render json: {nothing: true}
    end
  end


  private

  def member_params
    params.require(:member).permit(:user_id, :card_id)
  end
end
