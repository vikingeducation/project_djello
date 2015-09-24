class UserBoardsController < ApplicationController

  def create
    card = Card.find_by_id(params[:card_id])
    member = User.find_by_id(params[:user_id])

    respond_to do |format|

      if !card || !member
        format.json { render nothing: true, status: 404 }
      elsif card.board.members << member
        format.json { render json: member }
      else
        format.json { render nothing: true, status: 400 }
      end

    end

  end

  def destroy

    card = Card.find_by_id(params[:card_id])
    member = User.find_by_id(params[:user_id])

    respond_to do |format|

      if !card || !member
        format.json { render nothing: true, status: 404 }
      elsif card.board.members.delete(member)
        format.json { render json: member }
      else
        format.json { render nothing: true, status: 400 }
      end

    end

  end
end
