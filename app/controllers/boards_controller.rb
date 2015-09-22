class BoardsController < ApplicationController
  before_action :authenticate_user!
  before_action :require_owner, only: [:update, :destroy, :show]

  def index
    @boards = Board.where(user: current_user)

    respond_to do |format|
      format.json {render json: @boards.to_json(include: :lists)}
    end

  end

  def create
    @board = Board.new(board_whitelist_params)
    @board.user_id = current_user.id
    if @board.save
      respond_to do |format|
        format.json {render json: @board.to_json(include: :lists) }
      end
    end
  end

  def show
    respond_to do |format|
      format.json { render json: @board.to_json(include: :lists)}
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
        format.json { render json: @board.to_json(include: :lists) }
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
          format.json {render json: {errors: ["You must be the owner of this content!"]}, status: 403}
        end
      end
    end

end
