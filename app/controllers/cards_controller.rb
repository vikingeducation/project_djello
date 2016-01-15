class CardsController < ApplicationController


	def index
		@board = Board.find(params[:board_id])
		@cards = Card.where(:list_id => @board.lists)

		respond_to do |format|
			format.json { render json: @cards.to_json }
		end
	end


	def create
		@card = Card.new(card_params)

		respond_to do |format|
			if @card.save
				format.json { render json: @card.to_json(include: :list) }
			else
				format.json { render status: :unprocessable_entity }
			end
		end	
	end


private

	def card_params
		params.require(:card).permit(:list_id, :content, :type)
	end

end