Rails.application.routes.draw do
  root to: "tests#index"
  scope :api do
    scope :v1 do
      devise_for :users, controllers: { sessions: "users/sessions" }
      resources :boards
      resources :lists
      resources :cards
    end
  end
end
