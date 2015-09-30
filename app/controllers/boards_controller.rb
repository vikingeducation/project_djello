class BoardsController < ApplicationController

  def index

    if current_user
      boards = current_user.boards
      boards += current_user.assigned_boards
    else
      boards = []
    end

    render json: boards
  end

  def create
    board = Board.new(board_params)

    respond_to do |format|

      if board.save
        # board.members << User.find_by_id(board_params[:user_id])
        format.json { render json: board }
      else
        format.json { render nothing: true, status: 400 }
      end

    end

  end

  def show

    board = Board.find_by_id(params[:id])

    respond_to do |format|

      if board
        format.json { render json: board }
      else
        format.json { render nothing: true, status: 404 }
      end

    end

  end

  def update

    board = Board.find_by_id(params[:id])

    respond_to do |format|

      if !board
        format.json { render nothing: true, status: 404 }
      elsif board.update(board_params)
        format.json { render json: board }
      else
        format.json { render nothing: true, status: 400 }
      end

    end

  end

  def destroy

    board = Board.find_by_id(params[:id])

    respond_to do |format|

      if !board
        format.json { render nothing: true, status: 404 }
      elsif board.destroy
        format.json { render json: board }
      else
        format.json { render nothing: true, status: 400 }
      end

    end

  end

  private

  def board_params
    params.require(:board).permit(:name, :user_id)
  end

end
