class ListsController < ApplicationController


	def index
		@lists = List.where(:board_id => params[:board_id])

		respond_to do |format|
			format.json { render json: @lists.to_json }
		end
	end


	def create
		@list = List.new(list_params)

		respond_to do |format|
			if @list.save
				format.json { render json: @list }
			else
				format.json { render status: :unprocessable_entity }
			end
		end	
	end


	def show
		@list = List.find(params[:id])

		respond_to do |format|
			format.json { render json: @list.to_json(:include => {:board => { :include => :user } } ) }
		end
	end


private

	def list_params
		params.require(:list).permit(:board_id, :title, :description)
	end

end