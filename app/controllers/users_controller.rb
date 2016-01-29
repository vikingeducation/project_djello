class UsersController < ApplicationController

  def index

    respond_to do |format|
      format.json { render json: User.all.to_json, :status => 200 }
    end

  end
  
end
