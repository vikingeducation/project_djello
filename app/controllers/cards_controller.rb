class CardsController < ApplicationController
  def index
    list = List.find_by_id(params[:list_id])
    @cards = list.cards
    respond_to do |format|
      format.json { render json: @cards, status: 200 }
    end
  end

  def create
    @card = Card.new(card_params)
    if @card.save
      respond_to do |format|
        format.json { render json: @card, status: 200 }
      end
    end
  end

  def update
  end

  def destroy
  end

  private

    def card_params
      params.require(:card).permit(:title,
                                   :body,
                                   :completed,
                                   :members,
                                   :activities,
                                   :list_id)
    end
end
