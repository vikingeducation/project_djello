class CardsController < ApplicationController

  # before_filter :get_list

  def index
    respond_to do |format|
      if current_user
        @cards = @list.cards
        format.json { render json: @cards.to_json( include: :list ) }
      else
        format.json { render :status => 401, :json => { :success => false,
                                                        :info => "Unable to get card" } }
      end

    end
  end

  def show
    @card = Card.find(params[:id])

    respond_to do |format|
      format.json { render json: @card.to_json( include: :list ) }
    end
  end

  def create
    @card = Card.new(whitelist_card_params)

    respond_to do |format|
      if @card.save
        format.json { render json: @card.to_json( include: :list ) }
      end
    end
  end

  def update
    @card = Card.find(params[:id])
    respond_to do |format|
      if @card.update(whitelist_card_params)
        format.json { render json: @card.to_json( include: :list ) }
      end
    end
  end

  def destroy
    @card =Card.find(params[:id])
    respond_to do |format|
      if @card.destroy
        format.json { render json: @card.to_json( include: :list ) }
      end
    end
  end


  private

  def get_list
    @list = List.find(params[:list_id])
  end

  def whitelist_card_params
    params.require(:card).permit(:list_id, :id, :title, :description, :completed)
  end
end
