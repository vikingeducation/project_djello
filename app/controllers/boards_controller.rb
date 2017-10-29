class BoardsController < ApplicationController
  respond_to :json

  def show
    @board = Board.where(id: params[:id], owner: current_user).includes(lists: [:cards]).first
    if @board
      render :show
    else
      return head :not_found
    end

  end

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
    return head :not_found if @board.blank?
    if @board.destroy
      return head :no_content
    else
      return head :internal_server_error
    end
  end

  def whitelisted_params
    params.require(:board).permit(:title, :description)
  end
end
