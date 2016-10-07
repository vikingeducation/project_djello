class CardsController < ApplicationController

  def index
  end

  def show
  end

  def create
    @list = List.find(params[:list_id])
    @card = @list.cards.build(card_params)
    respond_to do |format|
      if @card.save
        format.json { render json: @card }
      else
        format.json { render status: :unprocessable_entity }
      end
    end
  end

  def update
  end

  def destroy
  end

private

  def card_params
    params.require(:card).permit(:title, :list_id)
  end

end
