class BoardsController < ApplicationController


  def create
    @board = current_user.boards.build(board_params)

    if @board.save
      flash[:success] = 'New board created!'
      respond_to do |format|
        format.json { render json: @board.to_json, :status => 201 }
      end
    else
      flash[:danger] = 'Sorry, there was an error. Please try again.'
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
