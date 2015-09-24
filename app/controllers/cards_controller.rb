class CardsController < ApplicationController

  def create
    @card = Card.create(whitelist_card_params)

    respond_to do |format|
      if @card.save
        format.json {render json: @card}
      else
        format.json {render status: :unprocessable_entity}
      end
    end

  end

  private

    def whitelist_card_params
      params.require(:card).permit(:title, :list_id)
    end

end
