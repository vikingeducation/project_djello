class CardsController < ApplicationController
  def index
  end

  def create

    @card = Card.new(card_params)

    respond_to do |format|

      if @card.save
        format.json { render json: @card.to_json({include: [:members, :not_members] }) }
      else
        format.json { render nothing: true }
      end
    end
  end

  def update

    @card = Card.find(params[:id])

    respond_to do |format|

      if @card.update(card_params)
        format.json { render json: @card.to_json({include: [:members, :not_members] }) }
      else
        format.json { render nothing: true }
      end
    end
  end

  private

  def card_params

    params.require(:card).permit(:name, :content, :list_id, :completed)

  end
end
