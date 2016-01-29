class CardMembersController < ApplicationController

  before_action :require_list_owner

  def create

    @card_member = CardMember.all.build(card_member_params)

    if @card_member.save
      flash.now[:success] = 'New member successfully created!'
      respond_to do |format|
        format.json { render json: @card_member.to_json(:include => [:card, :member]), :status => 201 }
      end
    else
      flash.now[:danger] = 'New member failed to be created'
      respond_ to do |format|
        format.json { render :nothing => :true, :status => 422 }
      end
    end

  end

  def destroy

    @card_member = CardMember.where(card_member_params)

    if @card_member.destroy
      flash.now[:success] = 'Member successfully deleted!'
      respond_to do |format|
        format.json { render :nothing => :true, :status => 204 }
      end
    else
      flash.now[:danger] = 'Member failed to be deleted'
      respond_to do |format|
        format.json { render :nothing => :true, :status => 422 }
      end
    end
    
  end

  private

  def card_member_params
    params.require(:card_member).permit(:card_id, :member_id)
  end

  def require_list_owner

    card = Card.find_by_id(params[:card_member][:card_id])
    list = card.list
    unless list.board.owner == current_user
      flash.now[:danger] = 'Unauthorized Access!'
      respond_to do |format|
        format.json { render :nothing => :true, :status => 401 }
      end
    end

  end
  
end
