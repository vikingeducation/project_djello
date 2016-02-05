class BoardsController < ApplicationController

  before_action :require_current_user, :except => [:index]

  def index

    @boards = current_user.all_active_boards

    respond_to do |format|
      format.json { render json: @boards.to_json(
        :include => [:owner,
                      {:lists => {
                        :include => {:cards => {
                          :include => [{:card_activities => {
                                        :methods => :message}},
                                      {:card_members => {
                                        :include => :member
                                        }}]
                          }}
                        }}]
        ), :status => 200 }
    end

  end

  def show

    @board = Board.find_by_id(params[:id])

    if @board
      respond_to do |format|
        format.json { render json: @board.to_json, :status => 200 }
      end
    else
      flash.now[:danger] = 'Unable to find board #{params[:id]}'
      respond_to do |format|
        format.json { render nothing: true, :status => 404 }
      end
    end

  end

  def create

    @board = current_user.boards.build

    if @board.save
      flash.now[:success] = 'New board created successfully!'
      respond_to do |format|
        format.json { render json: @board.to_json, :status => 201 }
      end
    else
      flash.now[:danger] = 'Board failed to be created'
      respond_to do |format|
        format.json { render nothing: true, :status => 422 }
      end
    end

  end

  def update

    @board = Board.find_by_id(params[:id])

    if @board.update(board_params)
      respond_to do |format|
        format.json { render :nothing => :true, :status => 200 }
      end
    else
      respond_to do |format|
        format.json { render :nothing => :true, :status => 422 }
      end
    end

  end

  def destroy

    @board = Board.find_by_id(params[:id])

    if @board && @board.destroy
      flash.now[:success] = 'Board successfully deleted!'
      respond_to do |format|
        format.json { render :nothing => :true, :status => 204 }
      end
    else
      flash.now[:danger] = 'Board failed to be deleted'
      respond_to do |format|
        format.json { render :nothing => :true, :status => 422 }
      end
    end

  end

  private

  def board_params
    params.require(:board).permit(:title)
  end

  def require_current_user

    board = Board.find_by_id(params[:id])
    unless board.nil? || board.owner == current_user
      flash.now[:danger] = "Unauthorized Access!"
      respond_to do |format|
        format.json { render :nothing => :true, :status => 401 }
      end
    end

  end

end
