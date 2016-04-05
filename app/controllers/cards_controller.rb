class CardsController < ApplicationController

  def create
    @card = Card.new(card_params)

    respond_to do |format|
      if @card.save
        format.json { render json: @card.to_json }
      else
        format.json { render status: :unprocessable_entity}
      end
    end
  end



  def update
    @card = List.find(params[:id])

    respond_to do |format|
      if @card.update(card_params)
        format.json { render json: @card.to_json }
      else
        format.json { render json: @card.errors, status: :unprocessable_entity }
      end
    end
  end



  def destroy 
    @card = List.find(params[:id])

    respond_to do |format|
      @card.destroy
      format.json { render json: @card.to_json }
    end
  end



  private

  def card_params 
    params.require(:card).permit(:title, :description, :list_id, :completed)
  end



end
