Rails.application.routes.draw do

  root 'static_pages#index'

  devise_for :users, controllers: {
        sessions: 'users/sessions'
      }
      devise_scope :user do
        get "sign_up", to: 'devise/registrations#new'
        get "sign_in", to: "devise/sessions#new"
        get "login", :to => "devise/sessions#new"
        delete "sign_out", :to => "devise/sessions#destroy"
        delete "logout", :to => "devise/sessions#destroy"
      end 

  authenticate :user do
    resources :static_pages, only: [:index]
  end


  # TODO: restrict to only the actions being used
  scope :api do
    scope :v1 do
      resources :boards
      resources :users
      resources :lists
    end
  end


end
