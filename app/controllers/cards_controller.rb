class CardsController < ApplicationController
  def create
    puts "creating card..."
    list = List.find_by_id(params[:list_id])
    @card = list.cards.build(card_params)
    if @card.save 
      puts "card created"
      respond_to do |format|
        format.json { render json: @card, status: 200 }
      end
    end
  end


  private 

  def card_params
    params.require(:card).permit(:title, :text)
  end
end
