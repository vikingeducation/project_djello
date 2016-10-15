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
          format.json { render json: @board.team.to_json(include: :users), status: 200 }
        end
      end
    end
  end

  def create
    @team = Team.new(team_params)
    members = get_users_by_emails(params[:team][:members])
    if @team.save
      @team.users = members
      respond_to do |format|
        format.json { render json: @team, status: 200 }
      end
    end
  end


  private 

  def team_params
    params.require(:team).permit(:name)
  end

end
