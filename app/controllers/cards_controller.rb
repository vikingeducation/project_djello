class CardsController < ApplicationController

  def create
    @card = Card.new(card_params)
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

  def update
    @card = Card.find(params[:id])
    respond_to do |format|
      if current_user.cards.includes(@card) && @card.update(card_params)
        format.json { render json: @card }
      else
        format.json { render status: :unprocessable_entity }
      end
    end
  end

  def destroy_member
    @membership = CardMembership.find_by(user_id: params[:user_id], card_id: params[:id])
    respond_to do |format|
      if @membership && @membership.destroy
        format.json { head :no_content }
      end
    end
  end

  private

  def card_params
    params.require(:card).permit(:title, :description, :list_id, :completed)
  end

end
