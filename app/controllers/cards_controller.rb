class CardsController < ApplicationController
  def index
  end

  def create
    p "*************************"

    @card = Card.new(card_params)

    respond_to do |format|

      if @card.save
        format.json { render json: @card }
      else
        format.json { render nothing: true }
      end
    end
  end

  private

  def card_params

    params.require(:card).permit(:name, :content, :list_id)

  end
end
