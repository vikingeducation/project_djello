class ActivitiesController < ApplicationController

  def index
    card = Card.find(params[:card_id])
    @activities = card.activities
    respond_to do |format|
      format.json { render json: @activities.to_json }
    end
  end

  def create
    @activity = current_user.activities.build(activity_params)
    respond_to do |format|
      if @activity.save
        format.json { render json: @activity.to_json }
      else
        format.json { render status: :unprocessable_entity }
      end
    end
  end

  private

  def activity_params
    params.require(:activity).permit(:card_id, :description)
  end
end
