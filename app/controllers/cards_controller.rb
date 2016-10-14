class CardsController < ApplicationController

  def create
    @card = Card.new(card_params)
    if @card.save
      respond_to do |format|
        format.json { render json: @card.to_json(include: [:members, :activities]) }
      end
    else
      respond_to do |format|
        format.json {}
      end
    end

  end

  def update
    @card = Card.find(params[:id])

    if @card.update(card_params)
      respond_to do |format|
        format.json { render json: @card.to_json(include: [:members, :activities]) }
      end
    else
      respond_to do |format|
        format.json {}
      end
    end
  end

  private

  def card_params
    params.require(:card).permit(:title, :description, :list_id, :completed)
  end

end
