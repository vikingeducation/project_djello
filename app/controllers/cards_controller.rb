class CardsController < ApplicationController
 before_action :set_card, :except => [:index, :create]

  def create
    @card = Card.new(card_params)
    respond_to do |format|
      if @card.save
        flash.now[:error] = 'card created'
        format.json { render :json => resource_to_json, :status => 201 }
      else
        flash.now[:error] = 'card not created'
        format.json { render :json => card_errors, :status => 422 }
      end
    end
  end

  def update
    respond_to do |format|
      if @card.update(card_params)
        flash.now[:error] = 'card updated'
        format.json { render :json => resource_to_json, :status => 200 }
      else
        flash.now[:error] = 'card not updated'
        format.json { render :json => card_errors, :status => 422 }
      end
    end
  end

  def destroy
    respond_to do |format|
      if @card.destroy
        flash.now[:error] = 'card destroyed'
        format.json { render :json => @card, :status => 200 }
      else
        flash.now[:error] = 'card not destroyed'
        format.json { render :json => card_errors, :status => 422 }
      end
    end
  end

  private
  def set_card
    @card = Card.find_by_id(params[:id])
    unless @card
      flash.now[:error] = 'Could not find board'
      respond_to do |format|
        format.json { render :json => card_errors , :status => 422 }
      end
    end
  end

  def card_params
    params.require(:card).permit(:title, :desc, :list_id)
  end

  def card_errors
    if @card
      error = @card.errors.full_messages.to_json
    else
      error = flash.now[:error]
    end
    { :errors => error }
  end

  def resource_to_json
    resource = action_name == 'index' ? @cards : @card
    resource.to_json
  end

end
