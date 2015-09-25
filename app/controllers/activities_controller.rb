class ActivitiesController < ApplicationController

  def create

    activity = Activity.new(activity_params)

    respond_to do |format|

      if activity.save
        format.json { render json: activity }
      else
        format.json { render nothing: true, status: 400 }
      end

    end

  end


  private

  def activity_params
    params.require(:activity).permit(:card_id, :content)
  end

end
