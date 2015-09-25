class CardsController < ApplicationController

  def create
    @card = Card.new(whitelist_card_params)

    respond_to do |format|
      if @card.save
        format.json {render json: @card }
      else
        format.json {render status: :unprocessable_entity}
      end
    end
  end

  def show
    @card = Card.find(params['id'])

    respond_to do |format|
      if @card
        format.json { render json: @card }
      else
        format.json { render status: :unprocessable_entity }
      end
    end
  end

  def update
    @card = Card.find(params['id'])

    respond_to do |format|
      if @card.update(whitelist_card_params)
        format.json { render json: @card }
      else
        format.json { render status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @card = Card.find(params['id'])

    respond_to do |format|
      if @card.destroy
        @cards = Card.all
        format.json { render json: @cards }
      else
        format.json { render status: :unprocessable_entity }
      end
    end
  end

  private

  def whitelist_card_params
    params.require(:card).permit(:list_id, :title, :description, :priority, :completed)
  end

end
