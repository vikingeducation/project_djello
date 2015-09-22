class BoardsController < ApplicationController

  def index
    @boards = current_user.boards

    respond_to do |format|
      format.json { render json: @boards.to_json( include: :user ) }
    end
  end

  def show
    @board = Board.find(params[:id])

    respond_to do |format|
      format.json { render json: @board.to_json( include: :user ) }
    end
  end

  def create
    @board = Board.new(whitelist_board_params)

    respond_to do |format|
      if @board.save
        format.json { render json: @board.to_json( include: :user ) }
      end
    end
  end

  def update
    @board = Board.find(params[:id])
    respond_to do |format|
      if @board.update(whitelist_board_params)
        format.json { render json: @board.to_json( include: :user ) }
      end
    end
  end

  def destroy
    @board = Board.find(params[:id])
    respond_to do |format|
      if @board.destroy
        format.json { render json: @board.to_json( include: :user ) }
      end
    end
  end


  private

  def whitelist_board_params
    params.require(:board).permit(:user_id, :title, :description)
  end

end
