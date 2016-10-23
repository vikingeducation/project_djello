class CardsController < ApplicationController
  before_action :current_user_member_of

  def create
    @card = Card.new(card_params)
    activity = {}
    activity[:user_id] = current_user.id
    title = @card.list.title
    activity[:action] = "#{current_user.username} created card for list #{title} titled #{@card.title}"


    if @card.save
      @card.position = @card.id * 100
      @card.save
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
    list_name = @card.list.title
    activity[:user_id] = current_user.id
    activity[:action] = "#{current_user.username} updated card for list #{list_name}"
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
    params.require(:card).permit(:title, :description, :list_id, :completed, :position)
  end


  def create_activity(params)
    @activity = Activity.new(params)
    @activity.save
  end

  def current_user_member_of
    if params[:id]
      card_id = params[:id]
      card = Card.find(card_id)
      @board = card.list.board
    elsif params[:card][:list_id]
      list_id = params[:card][:list_id]
      list = List.find(list_id)

      @board = list.board
    end
    

    boards = Board.all_with_user(current_user)

    unless boards.include?(@board)
      flash[:error] = "Not a member of this board"
      redirect_to :back
    end
  end

end
