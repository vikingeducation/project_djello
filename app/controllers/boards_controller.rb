class BoardsController < ApplicationController
  respond_to :json

  def show
    return head :not_found if current_user.boards.where(id: params[:id]).blank?
    @board = Board.includes(:owner, {lists: [:cards]}).where(id: params[:id]).first
    if @board
      @user = @board.owner
      return render :show
    else
      return head :not_found
    end

  end

  def update
    @board = Board.includes(:owner, lists: [:cards] ).where(id: params[:id])
    if @board.update(whitelisted_params)
      @board = @board.first
      @user = @board.owner
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

  def create
    @board = current_user.boards.build(whitelisted_params)
    if @board.save
      @user = current_user
      render :show
    else
      return head :bad_request
    end
  end

  def whitelisted_params
    params.require(:board).permit(:title, :description)
  end
end
