class CardsController < ApplicationController

  before_action :require_current_user


  def create
    # needs to be built off of the active board/list
    binding.pry
    @card = current_user.cards.build

    if @card.save
      flash.now[:success] = 'New card created!'
      respond_to do |format|
        format.json { render json: @card.to_json, :status => 201 }
      end
    else
      flash.now[:danger] = 'Sorry, there was an error. Please try again.'
      respond_to do |format|
        format.json { render nothing: true, :status => 422 }
      end
    end
  end


  def update
    @card = Card.find_by_id(params[:id])

    if @card.update(card_params)
      respond_to do |format|
        format.json { render :nothing => :true, :status => 200 }
      end
    else
      respond_to do |format|
        format.json { render :nothing => :true, :status => 422 }
      end
    end
  end


  def destroy
    @card = Card.find_by_id(params[:id])

    if @card && @card.destroy
      flash.now[:success] = 'Card deleted!'
      respond_to do |format|
        format.json { render :nothing => :true, :status => 204 }
      end
    else
      flash.now[:danger] = 'Sorry, there was an error. Please try again.'
      respond_to do |format|
        format.json { render :nothing => :true, :status => 422 }
      end
    end
  end


  private

    def card_params
      params.require(:card).permit(:title, :description, :list_id)
    end

    def require_current_user
      card = Card.find_by_id(params[:id])
      unless card.nil? || card.list.board.owner == current_user
        flash.now[:danger] = "You're not authorized to do this!"
        respond_to do |format|
          format.json { render :nothing => :true, :status => 401 }
        end
      end
    end


end
