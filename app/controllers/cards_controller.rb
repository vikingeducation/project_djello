class CardsController < ApplicationController
  before_action :authenticate_user!
  before_action :require_author , only: [:create]
  def create
    list = List.find(params[:card]['list_id'])
    @card = list.cards.build(card_whitelist_params)


    if @card.save
      respond_to do |format|
        format.json { render json: @card }
      end
    end
  end

  # cards are many-to-many with boards
  # to determin acces, the card must be trying to be placed on a list
  # that the current user has access to

  private
    def card_whitelist_params
      params.require(:card).permit(:title, :description, :completed)
    end

    def require_author
      list_ids = Board.includes(:lists).where(user_id: current_user).reduce([]) {|acc, board| return acc + board.list_ids }
      unless params[:card] and list_ids.include? params[:card]["list_id"]
        respond_to do |format|
          format.json {render json: {errors: ["You must be the owner of this content!"]}, status: 403}
        end
      end
    end
end
