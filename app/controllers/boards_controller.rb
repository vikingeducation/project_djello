class BoardsController < ApplicationController
  before_action :set_board, :except => [:index, :create]

  def index
    @boards = Board.where(user_id: current_user.id).order(:created_at => :desc)
    respond_to do |format|
      format.json { render :json => resource_to_json, :status => 200 }
    end
  end

  def create
    @board = Board.new(board_params)
    respond_to do |format|
      if @board.save
        flash.now[:error] = 'board created'
        format.json { render :json => resource_to_json, :status => 201 }
      else
        flash.now[:error] = 'board not created'
        format.json { render :json => board_errors, :status => 422 }
      end
    end
  end

  def show
    respond_to do |format|
      format.json { render :json => resource_to_json, :status => 200 }
    end
  end

  def update
    respond_to do |format|
      if @board.update(board_params)
        flash.now[:error] = 'Board updated'
        format.json { render :json => resource_to_json, :status => 200 }
      else
        flash.now[:error] = 'Board not updated'
        format.json { render :json => board_errors, :status => 422 }
      end
    end
  end

  def destroy
    respond_to do |format|
      if @board.destroy
        flash.now[:error] = 'board destroyed'
        format.json { render :json => @board, :status => 200 }
      else
        flash.now[:error] = 'board not destroyed'
        format.json { render :json => board_errors, :status => 422 }
      end
    end
  end

  private
  def set_board
    @board = Board.find_by_id(params[:id])
    unless @board
      flash.now[:error] = 'Could not find board'
      respond_to do |format|
        format.json { render :json => board_errors , :status => 422 }
      end
    end
  end

  def board_params
    params.require(:board).permit(:title, :user_id)
  end

  def board_errors
    if @board
      error = @board.errors.full_messages.to_json
    else
      error = flash.now[:error]
    end
    { :errors => error }
  end

  def resource_to_json
    resource = action_name == 'index' ? @boards : @board
    resource.to_json(:include => {:lists => {:include => :cards}})
  end

end
