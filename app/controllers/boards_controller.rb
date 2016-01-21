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


	def update
		@board = Board.find(params[:id])

		respond_to do |format|
			if @board.update(board_params)
				format.json { render nothing: true }
			else
				format.json { render status: :unprocessable_entity }
			end
		end
	end


	def create
		@board = Board.new(board_params)
		@board.user_id = current_user.id

		respond_to do |format|
			if @board.save
				format.json { render json: @board }
			else
				format.json { render status: :unprocessable_entity }
			end
		end	
	end


	def destroy
		@board = Board.find(params[:id])

		respond_to do |format|
			if @board.destroy
				format.json { render nothing: true }
			else
				format.json { render status: :unprocessable_entity }
			end
		end	
	end


private


	def board_params
		params.require(:board).permit(:name)
	end

end