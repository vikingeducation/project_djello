class CardsController < ApplicationController

  def create
    @card = Card.new(title: "Click to add title", description: "Click to add description")
    @card.user = current_user
    @card.board = Board.find(params[:boardId])
    @card.list = List.find(params[:listId])
    if @card.save
      create_activity(@card, "create")
     
      respond_to do |format|
        format.json { render json: @card.to_json( include: [:members, :activities]) , status: 200}
      end
    end

  end

  def update
    @card = Card.find(params[:id])
    @card.list_id = card_params[:list_id]
    activity_params = {}
    if @card.title != card_params[:title]
      activity_params["title"] = card_params[:title]
    end
    if @card.description != card_params[:description]
      activity_params["description"] = card_params[:description]
    end
    if @card.update(card_params)
      if activity_params
        create_activity(@card, activity_params)
      end
      respond_to do |format|
        format.json {render json: @card.to_json( include: [:members, :activities]) , status: 200}
      end
    end

  end

  def destroy
    @card = Card.find(params[:id])
    if @card.destroy
      respond_to do |format|
        format.json {render json: @card.to_json( include: :members) , status: 200}
      end
    end

  end

  private

  def card_params
    params.require(:card).permit(:title, :description, :list_id)
  end

  def create_activity(card, params)
     username = User.find(card.user_id).username
     if params == "create"
       card.activities.create({
          user_id: card.user_id,
          list_id: card.list_id,
          board_id: card.board_id,
          card_id: card.id,
          action: "#{username} added this card to the #{@card.board.title} board"
          })
     else
       params.each do |key, value|
         card.activities.create({
          user_id: card.user_id,
          list_id: card.list_id,
          board_id: card.board_id,
          card_id: card.id,
          action: "#{username} changed the #{key} of this card to #{value.to_s}"
          })
       end
     end
  end

  

end
