class CardsController < ApplicationController
  # before_action :authorized_user?

  def create

    card = Card.new(card_params)

    respond_to do |format|

      if card.save
        card.members << current_user
        format.json { render json: card.to_json(:include => [:activities]) }
      else
        format.json { render nothing: true, status: 400 }
      end
    end
  end

  def show

    card = Card.find_by_id(params[:id])

    respond_to do |format|
      if card
        format.json { render json: card.to_json(:include => [:activities]) }
      else
        format.json { render nothing: true, status: 404 }
      end
    end

  end

  def update

    card = Card.find_by_id(params[:id])

    respond_to do |format|

      if !card
        format.json { render nothing: true, status: 404 }
      elsif card.update(card_params)
        format.json { render json: card.to_json(:include => [:activities]) }
      else
        format.json { render nothing: true, status: 400 }
      end
    end
  end

  def destroy

    card = Card.find_by_id(params[:id])

    respond_to do |format|

      if !card
        format.json { render nothing: true, status: 404 }
      elsif card.destroy
        format.json { render json: card }
      else
        format.json { render nothing: true, status: 400 }
      end

    end

  end

  private

  def authorized_user?

    list = List.find_by_id(card_params[:list_id]) if card_params[:list_id]
    card = Card.find_by_id(params[:id]) if params[:id]

    if list
      if !list.members.include?(current_user)
        format.json { render nothing: true, status: 401 }
      end
    elsif card
      if !card.members.include?(current_user)
        format.json { render nothing: true, status: 401 }
      end
    end

  end

  def card_params

    params.require(:card).permit(:name, :content, :list_id)

  end
end
