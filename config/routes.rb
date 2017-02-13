Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'static_pages#index'

  scope :api do
    scope :v1 do
      resources :users, only: [:index]
      resources :boards do
        resources :lists, only: [:update, :destroy] do
          resources :cards, only: [:update, :destroy] do
            delete 'destroy_member', on: :member
            post   'add_member',     on: :member
          end
        end
      end
      resources :lists, only: [:create]
      resources :cards, only: [:create]
    end
  end
end
