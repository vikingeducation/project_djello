class BoardsController < ApplicationController

  def index
    if current_user
      @boards = Board.where(user_id: current_user.id)
    else
      @boards = []
    end

    render json: @boards
  end

  def create
    @board = Board.new(board_params)

    respond_to do |format|

      if @board.save
        format.json { render json: @board }
      else
        format.json { render nothing: true}
      end
    end
  end

  def show
    board = Board.find(params[:id])
    p board
    respond_to do |format|

      if board
        format.json { render json: board }
      else
        format.json { render nothing: true}
      end
    end
  end

  def destroy
    board = Board.find(params[:id])
    respond_to do |format|

      if board.destroy
        format.json { render json: board }
      else
        format.json { render nothing: true}
      end
    end
  end

  private

  def board_params
    params.require(:board).permit(:name, :user_id)
  end

end
