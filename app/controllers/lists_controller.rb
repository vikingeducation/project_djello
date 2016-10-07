class ListsController < ApplicationController
  def create
    @list = List.new(list_params)
    if @list.save
      respond_to do |format|
        format.json { render json: @list, status: 200 }
      end
    end
  end

  def index
    # We're only interested in a specific board's set of lists.
    board = Board.find_by_id(params[:board_id].to_i)
    @lists = board.lists
    respond_to do |format|
      format.json { render json: @lists, status: 200 }
    end
  end

  def update
    respond_to do |format|
      format.json { render json: { hello: 'HELLO FROM RAILS API' }, status: 200 }
    end
  end

  def destroy
    @list = List.find_by_id(params[:id])
    if @list.destroy
      respond_to do |format|
        format.json { head :no_content }
      end
    end
  end

  private

    def list_params
      params.require(:list).permit(:title,:description,:board_id)
    end
end
