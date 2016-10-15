class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception


  def get_users_by_emails(emails)
    users = []
    emails.each do |email|
      user = User.find_by_email(email)
      users.push(user) if user
    end
    users
  end

end
