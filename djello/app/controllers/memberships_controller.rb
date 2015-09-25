class MembershipsController < ApplicationController

  def index
    
    @memberships = Membership.where(:card_id => params[:card_id])
    respond_to do |format|
        format.json {render json: @memberships}
    end
  end

  def create
    @card = Card.find(params[:membership][:card_id])
    respond_to do |format|
      if Membership.create(user_id: params[:membership][:user_id], card_id: @card.id)
        format.json {render json: @membership}
      else
        format.json {render status: :unprocessable_entity}
      end
    end
    
  end

  def destroy
    
    @membership = Membership.find(params[:id])

    respond_to do |format|
      if @membership.destroy
        format.json {head :ok}
      else
        format.json {render status: :unprocessable_entity}
      end
    end
  end

  private

  def whiteparams
    params.require(:membership).permit(:card_id, :user_id, :id)
  end
end
