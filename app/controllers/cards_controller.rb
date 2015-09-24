class CardsController < ApplicationController

  def create

    card = Card.new(card_params)

    respond_to do |format|

      if card.save
        format.json { render json: card }
      else
        format.json { render nothing: true, status: 400 }
      end
    end
  end

  def show

    card = Card.find_by_id(params[:id])

    respond_to do |format|
      if card
        format.json { render json: card }
      else
        format.json { render nothing: true, status: 404 }
      end
    end

  end

  def update

    card = Card.find_by_id(params[:id])

    respond_to do |format|

      if !card
        format.json { render nothing: true, status: 404 }
      elsif card.update(card_params)
        format.json { render json: card }
      else
        format.json { render nothing: true, status: 400 }
      end
    end
  end

  private

  def card_params

    params.require(:card).permit(:name, :content, :list_id)

  end
end
