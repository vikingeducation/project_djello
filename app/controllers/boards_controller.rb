class BoardsController < ApplicationController

  def index
    #@boards = current_user.boards
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

  def board_params
    params.require(:board).permit(:title, :description)
  end

end
