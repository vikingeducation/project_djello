class BoardsController < ApplicationController

  def index
    @boards = current_user.boards

    respond_to do |format|
      format.json { render json: @boards.to_json(include: :lists) }
    end

  end


  def create
    @board = current_user.boards.build(board_params)

    respond_to do |format|
      if @board.save
        format.json { render json: @board.to_json }
      else
        format.json { render status: :unprocessable_entity }
      end
    end
  end


  def update
    @board = board.find(params[:id])

    respond_to do |format|
      if @board.update(board_params)
        format.json { render json: @board.to_json}
      else
        format.json { render status: :unprocessable_entity}
    end
  end


  def destroy
    # TODO: make this more narrow for just the current_user
    @board = Board.find(params[:id])

    respond_to do |format|
      @board.destroy
      format.json{ render json: @board.to_json }
    end

  end





  private

  def board_params
    params.require(:board).permit(:title, :description, :user_id)
  end


end
