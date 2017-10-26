class BoardsController < ApplicationController
  respond_to :json
  def update
    @board = Board.includes(:owner).where(id: params[:id])
    if @board.update(whitelisted_params)
      @board = @board.first
      render :show
    else
      return head :unprocessable_entity
    end
  end

  def destroy
    @board = Board.find(params[:id])
  end

  def whitelisted_params
    params.require(:board).permit(:title, :description)
  end
end
