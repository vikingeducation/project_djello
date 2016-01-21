class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_filter :must_be_signed_in
  before_filter :current_user


private


	def current_user
		@current_user ||= User.find_by_id(session[:id]) if session[:id]		
	end
	helper_method :current_user


	def signed_in_user?
		!!current_user
	end
	helper_method :signed_in_user?

	
	def must_be_signed_in
		unless signed_in_user?
			flash[:error] = "Must be signed in to view this page!"
			redirect_to root_url
		end	
	end

end