class ListsController < ApplicationController

  def index
    board = Board.find(params[:board_id])

    respond_to do |format|
      if !board
        format.json { render nothing: true, status: 404 }
      elsif board.user.id == current_user.id
        @lists = board.lists
        format.json { render json: @lists }
      else
        format.json { render nothing: true, status: 403 }
      end
    end

  end


end
