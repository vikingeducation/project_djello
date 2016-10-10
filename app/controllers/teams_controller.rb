class TeamsController < ApplicationController

  def index
    @teams = current_user.teams
    if @teams 
      respond_to do |format|
        format.json { render json: @teams, status: 200 }
      end
    else
      respond_to do |format|
        format.json { render json: @teams.errors, status: 200 }
      end
    end
  end

  def show
    puts "looking for team"
    if params[:board_id]
      puts "looking via board_id"
      @board = Board.find_by_id(params[:board_id])
      if @board && @board.team
        respond_to do |format|
          format.json { render json: @board.team, status: 200 }
        end
      end
    end
  end

end
