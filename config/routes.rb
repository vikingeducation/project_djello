Rails.application.routes.draw do
  get 'lists/create'

  get 'lists/index'

  get 'lists/update'

  get 'lists/destroy'

  devise_for :users

  root to: "static_pages#index"

  scope :api do
    scope :v1 do
      resources :boards
    end
  end
end
