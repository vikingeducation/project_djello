class CardsController < ApplicationController
  def create
    puts params[:card][:members]
    puts "creating card..."
    list = List.find_by_id(params[:list_id])
    @card = list.cards.build(card_params)
    if @card.save 
      assign_users_to_card(params[:card][:members], @card)
      puts "card created"
      respond_to do |format|
        format.json { render json: @card, status: 200 }
      end
    end
  end

  def update
    puts params
    if params.keys.include?("members")
      @card = Card.find_by_id(params[:id])
      @card.users = get_users_by_emails(params[:members]) if params[:members]
      @card.users = [] unless params[:members]
      if @card.save 
        respond_to do |format|
          format.json { render json: @card, status: 200 }
        end
      else
        puts "ERROR: Card couldn't be saved"
      end

    else
      puts "updating card..."
      @card = Card.find_by_id(params[:id])
      if @card.update(card_params)
        puts "card updated"
        respond_to do |format|
          format.json { render json: @card, status: 200 }
        end
      else 
        respond_to do |format|
          format.json { render json: @card.errors, status: 200 }
        end
      end    
    end

  end


  private 

  def card_params
    params.require(:card).permit(:title, :text, :completed)
  end

  def assign_users_to_card(members_array, card)
    if members_array 
      members_array.each do |member|
        puts member
        card.users << User.find_by_id(member[:id])
        card.save
      end
    end
  end

  
  
end
