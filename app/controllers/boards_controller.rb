class BoardsController < ApplicationController

  def index
    @boards = current_user.boards
    respond_to do |format|
      format.json { render json: @boards, status: 200 }
    end
  end

end
