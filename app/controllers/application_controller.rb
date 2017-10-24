class ApplicationController < ActionController::API
  include Knock::Authenticable
  before_action :authenticate_user
  respond_to :json
end
