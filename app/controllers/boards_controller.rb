class BoardsController < ApplicationController
  before_action :authenticate_user!

  def index
    @boards = current_user.boards
    respond_to do |format|
      format.json { render json: @boards.to_json }
    end
  end

  def create
  end

  def destroy
  end

  private

  def board_params
    params.require(:board).permit(:title)
  end

end
