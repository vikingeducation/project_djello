class SessionsController < Devise::SessionsController
  # prepend_before_filter :require_no_authentication, :only => [ :new, :create, :cancel ]
  skip_before_filter :require_no_authentication, :only => [:create, :new]

  clear_respond_to # won't accept html
  respond_to :json
end

#registration same, just inherit from diff. controller