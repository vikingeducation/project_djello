class CardsController < ApplicationController

  def create
    @card = Card.new(title: "Click to add title", description: "Click to add description")
    @card.user = current_user
    @card.board = Board.find(params[:boardId])
    @card.list = List.find(params[:listId])
    if @card.save
      respond_to do |format|
        format.json { render json: @card.to_json( include: :members) , status: 200}
      end
    end

  end

  def update
    @card = Card.find(params[:id])
    if @card.update(card_params)
      respond_to do |format|
        format.json {render json: @card.to_json( include: :members) , status: 200}
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
    params.require(:card).permit(:title, :description)
  end

end
