class SessionsController < ApplicationController

	skip_before_filter :must_be_signed_in, only: [:create, :new]
	

	def create
		@user = User.find_by_email(params['email'])
		if @user
			session[:id] = @user.id
			redirect_to main_index_path
		else
			flash.now.alert = "Invalid email or password"
			render "new"
		end
	end


	def new
		# Silence is golden
	end


	def destroy
		@user = current_user
	end


end
