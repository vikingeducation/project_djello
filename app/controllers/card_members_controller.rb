class CardMembersController < ApplicationController

  before_action :require_card_member

  def create

    @card_member = CardMember.all.build(card_member_params)

    if @card_member.save
      flash.now[:success] = 'New member successfully created!'
      respond_to do |format|
        format.json { render json: @card_member.to_json(:include => [:member, {:card => {:include => [{:card_activities => {:methods => :message}}]}}]), :status => 201 }
      end
    else
      flash.now[:danger] = 'New member failed to be created'
      respond_ to do |format|
        format.json { render :nothing => :true, :status => 422 }
      end
    end

  end

  def destroy

    @card_member = CardMember.find(params[:id])

    if @card_member.destroy
      flash.now[:success] = 'Member successfully deleted!'
      respond_to do |format|
        format.json { render json: @card_member.to_json(:include => [:member, {:card => {:include => [{:card_activities => {:methods => :message}}]}}]), :status => 200 }
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

  def require_card_member

    card_member = CardMember.find_by_id(params[:id])

    if card_member
      card = card_member.card
    else
      card = Card.find_by_id(params[:card_member][:card_id])
    end
    
    list = card.list

    # requires current_user to either be a member of the card or the owner of the card
    unless card.members.include?(current_user) || list.board.owner == current_user
      flash.now[:danger] = 'Unauthorized Access!'
      respond_to do |format|
        format.json { render :nothing => :true, :status => 401 }
      end
    end

  end
  
end
