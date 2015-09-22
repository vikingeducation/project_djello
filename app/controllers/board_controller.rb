class BoardController < ApplicationController
  before_action :authenticate_user!

  def create 
    @board = Board.new(board_whitelist_params)
    @board.user_id = current_user.id
    if @board.save
      respond_to do  |format|
        format.json {render :json => @board }
      end
    end
  end

  private
    def board_whitelist_params
      params.require(:board).permit(:name)
    end

end
