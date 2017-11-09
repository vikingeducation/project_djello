class CardsController < ApplicationController
  respond_to :json
  before_action :check_membership, only: [:show, :update]


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
    render :show
  end

  def update
    if @card.update(whitelisted_params)
      render :show
    else
      head :unprocessable_entity
    end
  end

  private

  def whitelisted_params
    params.require(:card).permit(:title, :description, :done)
  end

  def check_membership
    @card = Card.includes(:members).find_by_id(params[:id])
    return head :not_found unless @card
    return head :unauthorized unless @card.members.include?(current_user) || @card.owner == current_user
  end


end
