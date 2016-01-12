class BoardsController < ApplicationController

	def index
		@boards = Board.where(:user_id => current_user.id)

		respond_to do |format|
			format.json { render json: @boards.to_json }
		end
	end


	def show
		@board = Board.find(params[:id])

		respond_to do |format|
			format.json { render json: @board.to_json(include: :user) }
		end
	end

end