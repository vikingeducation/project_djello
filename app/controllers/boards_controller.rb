class BoardsController < ApplicationController

  def index
    @boards = Board.all

    respond_to do |format|
      format.json {render json: @boards, status: 200}
    end
  end

  def create
    @board = Board.new(title: "Add Title...")
    @board.user = current_user

    if @board.save
      respond_to do |format|
        format.json { render json: @board, status: 201 }
      end
    end
  end

  def show
    @board = Board.find(params[:id])

    respond_to do |format|
      format.json {render json: @board, status: 200}
    end
  end


  def update
    @board = Board.find(params[:id])
    if @board.update(board_params)
      respond_to do |format|
        format.json {render json: @board, status: 200}
      end
    end
  end

  def destroy
    @board = Board.find(params[:id])
    if @board.destroy
      respond_to do |format|
        format.json { render json: @board, 
          status: 200 }
      end
    end
  end


  private

  def board_params
    params.require(:board).permit(:title)
  end
end
