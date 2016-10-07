Rails.application.routes.draw do

  get 'cards/index'

  get 'cards/create'

  get 'cards/update'

  get 'cards/destroy'

  devise_for :users

  root to: "static_pages#index"

  scope :api do
    scope :v1 do
      resources :boards
      resources :lists
    end
  end
end
