Rails.application.routes.draw do
  
  root "static_pages#index"

  devise_for :users

  scope :api do
    scope :v1 do
      resources :boards, :only => [:index, :create, :destroy, :show]
      resources :lists, :only => [:index, :create, :destroy, :update]
      resources :cards, :only => [:index, :create, :update]
      resources :users, :only => [:index]
      resources :card_memberships, :only => [:index, :create, :destroy]
    end
  end

end
