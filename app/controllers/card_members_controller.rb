class CardMembersController < ApplicationController

  before_action :require_list_owner


  def create
    @card_member = CardMember.all.build(card_member_params)

    if @card_member.save
      flash.now[:success] = 'New member added!'
      respond_to do |format|
        format.json { render json: @card_member.to_json(:include => [:card, :member]), :status => 201 }
      end
    else
      flash.now[:danger] = 'Sorry, there was an error. Please try again.'
      respond_to do |format|
        format.json { render nothing: true, :status => 422 }
      end
    end
  end


  def destroy
    @card_member = CardMember.find(params[:id])

    if @card_member.destroy
      flash.now[:success] = 'Member removed!'
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

    def card_member_params
      params.require(:card_member).permit(:card_id, :member_id)
    end

    def require_list_owner
      card_member = CardMember.find_by_id(params[:id])

      if card_member
        card = card_member.card
      else
        card = Card.find_by_id(params[:card_id])
      end

      list = card.list
      unless list.board.owner == current_user
        flash.now[:danger] = "You're not authorized to do this!"
        respond_to do |format|
          format.json { render :nothing => :true, :status => 401 }
        end
      end
    end

end
