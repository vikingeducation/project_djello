class BoardsController < ApplicationController

  def show

    @board = Board.find_by_id(params[:id])

    if @board
      respond_to do |format|
        format.json { render json: @board.to_json, :status => 201 }
      end
    else
      flash[:danger] = 'Unable to find board #{params[:id]}'
      respond_to do |format|
        format.json { render nothing: true, :status 422 }
      end
    end

  end

  def create

    @board = current_user.boards.build(board_params)

    if @board.save
      flash[:success] = 'New board created successfully!'
      respond_to do |format|
        format.json { render json: @board.to_json, :status => 201 }
      end
    else
      flash[:danger] = 'Board failed to be created'
      respond_to do |format|
        format.json { render nothing: true, :status => 422 }
      end
    end

  end

  private

  def board_params
    params.require(:board).permit(:title)
  end

end
