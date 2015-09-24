class ListsController < ApplicationController

  def index
    board = Board.find(params[:board_id])

    respond_to do |format|
      if !board
        format.json { render nothing: true, status: 404 }
      elsif board.user.id == current_user.id
        @lists = board.lists
        format.json do
                      render json: @lists.to_json(include: { cards:
                                                 {include: :members } })
                    end
      else
        format.json { render nothing: true, status: 403 }
      end
    end

  end

  def create

    @list = List.new(list_params)

    respond_to do |format|

      if @list.save
        format.json { render json: @list }
      else
        format.json { render nothing: true }
      end
    end
  end

  private

  def list_params

    params.require(:list).permit(:name, :board_id)

  end

end
