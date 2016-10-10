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

  def update
    puts "updating card..."
    @card = Card.find_by_id(params[:id])
    if @card.update(card_params)
      puts "card updated"
      respond_to do |format|
        format.json { render json: @card, status: 200 }
      end
    else 
      respond_to do |format|
        format.json { render json: @card.errors, status: 200 }
      end
    end
  end


  private 

  def card_params
    params.require(:card).permit(:title, :text, :completed)
  end
  
end
