class CardsController < ApplicationController
  before_action :authenticate_user!
  before_action :require_access, only: [:update]
  before_action :require_author, only: [:create]
  def create
    list = List.find(params[:card]['list_id'])
    @card = list.cards.create(card_whitelist_params)


    if @card
      @activity = Activity.create(recordable:@card, message: "This card was created!")
      respond_to do |format|
        format.json { render json: @card.to_json(include: :activities)}
      end
    end
  end

  def update
  @card = Card.find(params[:id])

    if @card.update(card_whitelist_params)
      respond_to do |format|
        format.json {render json: @card }
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

    def require_access
      list_ids = current_user.owned_card_ids
      unless params[:card] and (list_ids.include? params[:card]["id"].to_i or Membership.find_by(user_id: current_user.id, card_id: params[:card]["id"].to_i))
        respond_to do |format|
          format.json {render json: {errors: ["You must be the owner of this content!"]}, status: 403}
        end
      end
    end

    def require_author
      list = params[:card] ? List.find_by_id(params[:card]["list_id"]) : false
      board_id = list ? list.board_id : false
      unless board_id and current_user.board_ids.include? board_id or current_user.can_view? board_id
        respond_to do |format|
          format.json {render json: {errors: ["You must be the owner of this content!"]}, status: 403}
        end
      end
    end
end
