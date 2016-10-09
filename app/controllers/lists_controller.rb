class ListsController < ApplicationController
  def index
    @lists = List.where("board_id = ?", params[:board_id])
    respond_to do |format|
      format.json { render json: @lists.to_json(include: :cards), status: 200 }
    end
  end

  def create
    puts params
    board = Board.find_by_id(params[:board_id])
    @list = board.lists.build(list_params)
    if @list.save 
      respond_to do |format|
        format.json {render json: @list, status: 200 }
      end
    end
  end

  def update
    puts "updating..."
    @list = List.find_by_id(params[:id])
    @list.update(list_params)
    if @list.save!
      puts "list updated"
      respond_to do |format|
        format.json { render json: @list, status: 200 }
      end
    end
  end

  def destroy
    @list = List.find_by_id(params[:id])
    list = @list.destroy!
    if @list
      respond_to do |format|
        format.json { render json: @list, status: 200 }
      end
    end
  end


  private

  def list_params
    params.require(:list).permit(:id, :title, :description)
  end

end
