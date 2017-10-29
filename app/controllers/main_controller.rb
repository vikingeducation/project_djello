class MainController < ApplicationController
  respond_to :json

  def index
    if current_user.boards.empty?
      return head :not_found
    else
      @user = User.includes(:boards, :lists, cards: [:members]).where(id: current_user.id).first
      @current_board = @user.most_recent_board
    end
  end
end
