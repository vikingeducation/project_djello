class BoardsController < ApplicationController

  def index
    @boards = Board.all
    respond_to do |format|
      format.json { render json: @boards }
    end
  end

  def show
    @board = Board.find(params[:id])
    respond_to do |format|
      format.json { render json:
        @board.to_json(include:{ lists:{include: {cards:{include: :users}}}})}
    end
  end

  def create
    @board = Board.new(board_params)
    respond_to do |format|
      if @board.save
        format.json { render json: @board }
      else
        format.json { render status: :unprocessable_entity }
      end
    end
  end

  def update
    @board = Board.find(params[:id])
    respond_to do |format|
      if @board.update(board_params)
        format.json { head :no_content }
      else
        format.json { render status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @board = Board.find(params[:id])
    respond_to do |format|
      if @board.destroy
        format.json { render json: @board }
      else
        format.json { render status: :unprocessable_entity }
      end
    end
  end

private

  def board_params
    params.require(:board).permit(:title)
  end

end
