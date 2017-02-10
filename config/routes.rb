Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'static_pages#index'

  scope :api do
    scope :v1 do
      resources :boards do
        resources :lists, only: [:update] do
          resources :cards, only: [:update, :destroy]
        end
      end
      resources :lists, only: [:create]
      resources :cards, only: [:create]
    end
  end
end
