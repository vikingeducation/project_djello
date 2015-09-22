class BoardsController < ApplicationController
  before_action :authenticate_user!
  before_action :require_owner, only: [:update, :destroy]

  def index
    @boards = Board.where(user: current_user)

    respond_to do |format|
      format.json {render json: @boards}
    end

  end

  def create
    @board = Board.new(board_whitelist_params)
    @board.user_id = current_user.id
    if @board.save
      respond_to do |format|
        format.json {render json: @board }
      end
    end
  end

  def show
    @board = Board.find(params[:id])
    respond_to do |format|
      format.json { render json: @board}
    end
  end

  def destroy
    if @board.destroy
      respond_to do |format|
        format.json { render json: "Deleted!"}
      end
    end
  end

  def update
    if @board.update(board_whitelist_params)
      respond_to do |format|
        format.json { render json: @board }
      end
    end
  end

  private
    def board_whitelist_params
      params.require(:board).permit(:name)
    end

    def require_owner
      @board = Board.find(params[:id])
      unless current_user.id == @board.user_id
        respond_to do |format|
          format.json {render json: "Not allowed!", response: 403}
        end
      end
    end

end
