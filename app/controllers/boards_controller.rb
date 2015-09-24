class BoardsController < ApplicationController
  before_action :authenticate_user!
  before_action :require_access, only: [:show, :update, :destroy]
  before_action :require_owner, only: [:update, :destroy]

  def index
    @boards = current_user.all_boards

    respond_to do |format|
      format.json {render json: @boards.to_json(include: {lists: {include: {cards: {include: :members}}}} )}
    end

  end

  def create
    @board = Board.new(board_whitelist_params)
    @board.user_id = current_user.id
    if @board.save
      respond_to do |format|
        format.json {render json: @board.to_json(include: {lists: {include: {cards: {include: :members}}}} ) }
      end
    end
  end

  def show
    respond_to do |format|
      format.json { render json: @board.to_json(include: {lists: {include: {cards: {include: :members}}}} )}
    end
  end

  def destroy
    @cached_board = @board
    if @board.destroy
      respond_to do |format|
        format.json { render json: @cached_board }
      end
    end
  end

  def update
    if @board.update(board_whitelist_params)
      respond_to do |format|
        format.json { render json: @board.to_json(include: {lists: {include: {cards: {include: :members}}}} ) }
      end
    end
  end

  private
    def board_whitelist_params
      params.require(:board).permit(:name)
    end

    def require_access
      @board = Board.find_by_id(params[:id].to_i)
      unless current_user.all_boards.include? (@board)
        respond_to do |format|
          format.json {render json: {errors: ["You must be a member of this content!"]}, status: 403}
        end
      end
    end

    def require_owner
      unless current_user.boards.include? (@board)
        respond_to do |format|
          format.json {render json: {errors: ["You must be the owner of this content!"]}, status: 403}
        end
      end
    end

end
