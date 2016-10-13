class BoardsController < ApplicationController

  def index
    @boards = current_user.boards

    respond_to do |format|
      format.json { render json: @boards }
    end

  end


  def show
    @board = Board.find(params[:id])

    respond_to do |format|
      format.json { render json: @board }
    end

  end
end
