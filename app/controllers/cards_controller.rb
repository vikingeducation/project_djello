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
    @card = Card.find(params[:id])
    respond_to do |format|
      if @card.update(card_params)
        format.json { head :no_content }
      else
        format.json { render status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @card = Card.find(params[:id])
    respond_to do |format|
      if @card.destroy
        format.json { render json: @card }
      else
        format.json { render status: :unprocessable_entity }
      end
    end
  end

private

  def card_params
    params.require(:card).permit(:title, :description, :list_id)
  end

end
