class ListsController < ApplicationController

  def index
    board = Board.find_by_id(params[:board_id])

    respond_to do |format|

      if !board
        format.json { render nothing: true, status: 404 }
      elsif board.members.include?(current_user)
        lists = board.lists
        # format.json { render json: lists.to_json(:include => [:cards]) }
        format.json { render json: lists.to_json(:include => { :cards => { :include => [:activities] } }) }
      else
        format.json { render nothing: true, status: 403 }
      end

    end

  end

  def create

    list = List.new(list_params)

    respond_to do |format|

      if list.save
        format.json { render json: list }
      else
        format.json { render nothing: true, status: 400 }
      end
    end
  end

  def show

    list = List.find_by_id(params[:id])

    respond_to do |format|

      if list
        format.json { render json: list }
      else
        format.json { render nothing: true, status: 404 }
      end

    end

  end

  def update

    list = List.find_by_id(params[:id])

    respond_to do |format|

      if !list
        format.json { render nothing: true, status: 404 }
      elsif list.update(list_params)
        format.json { render json: list }
      else
        format.json { render nothing: true, status: 400 }
      end

    end

  end

  private

  def list_params

    params.require(:list).permit(:name, :board_id)

  end

end
