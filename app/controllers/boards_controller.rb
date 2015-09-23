class BoardsController < ApplicationController

  before_action :authenticate_user!

  def index
    @boards = Board.all

    respond_to do |format|
      format.json {render json: @boards.to_json(include: :lists)}
    end

  end

  def create
    @board = Board.new(whitelist_board_params)
    # binding.pry
    @board.user_id = current_user.id

    respond_to do |format|
      if @board.save
        format.json {render json: @board}
      else
        format.json {render status: :unprocessable_entity}
      end
    end

  end

  def show
    @board = Board.find(params['id'])

    respond_to do |format|
      if @board
        format.json { render json: @board.to_json(include: :lists) }
      else
        format.json { render status: :unprocessable_entity }
      end
    end
  end

  def update
  end

  def destroy
    @board = Board.find(params['id'])

    respond_to do |format|
      if @board.destroy
        @boards = Board.all
        format.json { render json: @boards.to_json(:include => :lists) }
      else
        format.json { render status: :unprocessable_entity }
      end
    end
  end

  private

  def whitelist_board_params
    params.require(:board).permit(:title)
  end

end
