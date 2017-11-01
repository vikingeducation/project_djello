class CardsController < ApplicationController
  respond_to :json

  def create
    @list = List.find(params[:list_id])
    @card = @list.cards.build(whitelisted_params)
    if @card.save
      render :show
    else
      head :unprocessable_entity
    end
  end

  def show
    @card = Card.find(params[:id])
    render :show
  end

  def whitelisted_params
    params.require(:card).permit(:title, :description)
  end
end
