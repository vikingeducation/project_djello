class CardsController < ApplicationController

  def create
    @card = current_user.cards.build(card_params)
    respond_to do |format|
      if @card.save
        format.json { render json: @card }
      else
        format.json { render status: :unprocessable_entity }
      end
    end
  end

  def index
    list = List.find(params[:list_id])
    @cards = list.cards
    respond_to do |format|
      format.json { render json: @cards.to_json }
    end
  end

  def show
  end

  def update
  end

  def destroy
  end

  private

  def card_params
    params.require(:card).permit(:title, :description, :list_id)
  end

end
