class AngularController < ApplicationController

  before_action :authenticate_user!

  # Landing page to kick off Angular single-page app
  def index
  end

end
