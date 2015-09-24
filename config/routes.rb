Rails.application.routes.draw do
  root to: "tests#index"
  scope :api do
    scope :v1 do
      resources :users, only: :index
      devise_for :users, controllers: { sessions: "users/sessions" }
      resources :boards
      resources :lists
      resources :cards
      resources :card_members
    end
  end
end
