class BoardsController < ApplicationController
  before_action :current_user_member_of, only: [:show]

  def index
    
    @boards = Board.all_with_user(current_user)

    respond_to do |format|
      format.json { render json: @boards.to_json(include: :lists)}
    end

  end


  def show
    @board = Board.find(params[:id])

    respond_to do |format|
      format.json { render json: @board.to_json(include: {
                                              lists: {
                                                 include: {
                                                    cards: {
                                                      include: [:members, :activities]  
                                                    }
                                                  } 
                                                
                                                }
                                              }
                                              )}
    end

  end

  def create
    @board = current_user.boards.new(board_params)
    if @board.save

      respond_to do |format|
        format.json { render json: @board.to_json(include: {
                                                    lists: {
                                                       include: {
                                                          cards: {
                                                            include: [:members, :activities]  
                                                          }
                                                        } 
                                                      
                                                      }
                                                    }
                                                    )}
      end
    else 
      respond_to do |format|
        format.json {}
      end
    end

  end


  private

  
  def current_user_member_of
    id = params[:id]
    @board = Board.find(id)

    boards = Board.all_with_user(current_user)

    unless boards.include?(@board)
      flash[:error] = "Not a member of this board"
      redirect_to :back
    end
  end



  def board_params
    params.require(:board).permit(:title, :description)
  end

end
