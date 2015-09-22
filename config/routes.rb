Rails.application.routes.draw do

  root 'main#index'

  scope :api do
    scope :v1 do
      # devise_for :users
      devise_for :users, controllers: {
        sessions: 'users/sessions'
      }
    end
  end

end
