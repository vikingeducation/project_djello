Rails.application.routes.draw do

  root to: 'static_pages#index'
  devise_for :users
  get 'static_pages/index'

  scope :api do
    scope :v1 do
      resources :boards do
        resources :lists, shallow: true do
          resources :cards, shallow: true
        end
      end
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
