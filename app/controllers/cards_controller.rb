class CardsController < ApplicationController

  before_filter :get_card, only: [:show, :update, :destroy]

  def index
    if current_user
      @cards = current_user.cards
    else
      respond_to do |format|
        format.json { render :status => 401, :json => { :success => false,
                                                      :info => "Unable to get cards" } }
      end
    end
  end

  def show
  end

  def create
    @card = Card.new(card_params)

    respond_to do |format|
      if @card.save
        format.json { render json: @card.to_json( include: :list ) }
      end
    end
  end

  def update
    respond_to do |format|
      if @card.update(card_params)
        format.json { render json: @card.to_json( include: :list ) }
      end
    end
  end

  def destroy
    respond_to do |format|
      if @card.destroy
        format.json { render json: @card.to_json( include: :list ) }
      end
    end
  end


  private

  def get_card
    @card = Card.find(params[:id])
  end

  def card_params
    params.require(:card).permit(:list_id, :title, :description, :completed)
  end
end
