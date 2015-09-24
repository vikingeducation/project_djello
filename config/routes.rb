Rails.application.routes.draw do
  devise_for :users, :controllers => {sessions: 'sessions'}

  root to: "main#index"

  scope :api do
    scope :v1 do
      resources :boards, except: [:new, :edit]
      resources :lists, only: [:create, :update, :destroy]
      resources :cards, only: [:create, :update, :destroy]
      resources :memberships, only: [:create]
    end
  end
end
