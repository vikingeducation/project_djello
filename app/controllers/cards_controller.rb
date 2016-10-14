class CardsController < ApplicationController

  def create
    @card = Card.new(card_params)
    activity = {}
    activity[:user_id] = current_user.id
    title = @card.list.title
    activity[:action] = "#{current_user.username} created card for list #{title} titled #{@card.title}"

    if @card.save
      activity[:card_id] = @card.id
      create_activity(activity)
      respond_to do |format|
        format.json { render json: @card.to_json(include: [:members, :activities]) }
      end
    else
      respond_to do |format|
        format.json {}
      end
    end

  end

  def update
    @card = Card.find(params[:id])
    activity = {}
    board_name = @card.list.board.title
    activity[:user_id] = current_user.id
    activity[:action] = "#{current_user.username} updated card for #{board_name}"
    activity[:card_id] = @card.id


    if @card.update(card_params)
      create_activity(activity)
      respond_to do |format|
        format.json { render json: @card.to_json(include: [:members, :activities]) }
      end
    else
      respond_to do |format|
        format.json {}
      end
    end
  end

  private

  def card_params
    params.require(:card).permit(:title, :description, :list_id, :completed)
  end


  def create_activity(params)
    @activity = Activity.new(params)
    @activity.save
  end

end
