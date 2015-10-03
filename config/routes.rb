Rails.application.routes.draw do
  
  root 'djello#index'

  devise_for :users, controllers: { sessions: "users/sessions", registrations: "users/registrations" }

  scope :api do
    scope :v1 do
      resources :users, only: [:index]
      resources :user_cards
      delete "/user_cards(.:format)", to: "user_cards#destroy"

      resources :boards do
        resources :lists 
        resources :cards
        resources :activities
      end

    end
  end

end
