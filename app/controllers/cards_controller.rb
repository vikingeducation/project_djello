class CardsController < ApplicationController
  def index
    list = List.find_by_id(params[:list_id])
    @cards = current_user
                .cards_authored_and_member
                .where(list_id: list.id)
    respond_to do |format|
      format.json {
        # You can nest another hash in the association to call each instance's methods.
        render json: @cards.to_json({include: {activities: {methods: :owner }}}), status: 200 }
    end
  end

  def create
    @card = current_user.cards.build(card_params)
    if @card.save
      respond_to do |format|
        format.json { render json: @card, status: 200 }
      end
    end
  end

  def update
    @card = Card.find_by_id(card_params['id'])
    if @card.update(card_params)
      respond_to do |format|
        format.json { render json: @card, status: 200 }
      end
    end
  end

  def destroy
  end

  private

    def card_params
      params.require(:card).permit(:id,
                                   :title,
                                   :body,
                                   :completed,
                                   :members,
                                   :activities,
                                   :list_id)
    end
end
