class ListsController < ApplicationController

  before_fitler :get_board

  def index
    respond_to do |format|
      if current_user
        @lists = @board.lists
        format.json { render json: @lists.to_json( include: :board ) }
      else
        format.json { render :status => 401, :json => { :success => false,
                                                        :info => "Unable to get list" } }
      end

    end
  end

  def show
    @list = List.find(params[:id])

    respond_to do |format|
      format.json { render json: @list.to_json( include: :board ) }
    end
  end

  def create
    @list = List.new(whitelist_list_params)

    respond_to do |format|
      if @list.save
        format.json { render json: @list.to_json( include: :board ) }
      end
    end
  end

  def update
    @list = List.find(params[:id])
    respond_to do |format|
      if @list.update(whitelist_list_params)
        format.json { render json: @list.to_json( include: :board ) }
      end
    end
  end

  def destroy
    @list = List.find(params[:id])
    respond_to do |format|
      if @list.destroy
        format.json { render json: @list.to_json( include: :list ) }
      end
    end
  end

  private

  def get_board
    @board = Board.find(params[:board_id])
  end

  def whitelist_list_params
    params.require(:list).permit(:board_id, :id, :title, :description)
  end
end
