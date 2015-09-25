class ActivitiesController < ApplicationController

  def show
    @activity = Activity.find(params[:id])

    respond_to do |format|
      format.json { render json: @activity.to_json( include: :user ) }
    end
  end

  def create
    @activity = Activity.new(whitelist_activity_params)

    respond_to do |format|
      if @activity.save
        format.json { render json: @activity.to_json( include: :user ) }
      end
    end
  end

  private

  def whitelist_activity_params
    params.require(:activity).permit(:user_id, :card_id, :desc)
  end

end
