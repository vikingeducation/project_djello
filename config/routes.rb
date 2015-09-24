Rails.application.routes.draw do
  devise_for :users, :controllers => {sessions: 'sessions'}

  root to: "main#index"

  scope :api do
    scope :v1 do
      resources :users, only: [:index]
      resources :boards, except: [:new, :edit]
      resources :lists, only: [:create, :update, :destroy]
      resources :cards, only: [:show, :create, :update, :destroy]
      resource :memberships, only: [:create, :destroy]
    end
  end
end
