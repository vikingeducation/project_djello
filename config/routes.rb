Rails.application.routes.draw do
  
  root 'djello#index'

  devise_for :users, controllers: { sessions: "users/sessions" }

  scope :api do
    scope :v1 do
      resources :users, only: [:index]
      resources :user_boards
      delete "/user_boards(.:format)", to: "user_boards#destroy"

      resources :boards do
        resources :lists 
        resources :cards
        resources :activities
      end

    end
  end

end
