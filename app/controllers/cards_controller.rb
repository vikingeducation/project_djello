class CardsController < ApplicationController


	def index
		@board = Board.find(params[:board_id]) || Board.find(params[:id])
		@cards = Card.where(:list_id => @board.lists)

		respond_to do |format|
			format.json { render json: @cards.to_json }
		end
	end


	def create
		@card = Card.new(card_params)
		@card.activity = ["#{@card.list.board.user.username} added this card to the #{@card.list.title} list on <span class=\"card-date\">#{Time.now.strftime("%b %d, %Y")}</span>"].to_json

		respond_to do |format|
			if @card.save
				format.json { render json: @card.to_json(include: :list) }
			else
				format.json { render status: :unprocessable_entity }
			end
		end	
	end


	def show
		@card = Card.find(params[:id])

		respond_to do |format|
			format.json { render json: @card.to_json(:include => { :list => { :include => { :board => { :include => :user } } } } ) }
		end
	end


	def update
		@card = Card.find(params[:id])
		@card.activity = JSON.parse(@card.activity) << "#{@card.list.board.user.username} changed the content of this card on <span class=\"card-date\">#{Time.now.strftime("%b %d, %Y")}</span>"

		respond_to do |format|
			if @card.update(card_params)
				format.json { render json: @card.to_json }
			else
				format.json { render status: :unprocessable_entity }
			end
		end
	end


	def destroy
		@card = Card.find(params[:id])

		respond_to do |format|
			if @card.destroy
				format.json { render nothing: true }
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