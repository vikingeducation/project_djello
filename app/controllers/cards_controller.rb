class CardsController < ApplicationController

  def create
    @card = Card.new(title: "Click to add title", description: "Click to add description")
    @card.user = current_user
    @card.board = Board.find(params[:boardId])
    @card.list = List.find(params[:listId])
    if @card.save
      respond_to do |format|
        format.json { render json: @card, status: 200}
      end
    end

  end

  def update

  end

  def destroy

  end

end
