Rails.application.routes.draw do
  root to: "tests#index"
  scope :api do
    scope :v1 do
      devise_for :users, controllers: { sessions: "users/sessions" }
      resources :users
      resources :boards
      resources :lists
      resources :cards
      resources :card_members
      resources :activities
    end
  end
end
