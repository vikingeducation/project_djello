Rails.application.routes.draw do

  root 'main#index'

  scope :api do
    scope :v1 do
      devise_for :users, controllers: {
        sessions: 'users/sessions'
      }
      resources :boards, only: [:create, :update, :destroy, :index, :show]
      resources :lists,  only: [:create, :update, :destroy]
      resources :cards, only: [:create, :update, :show, :destroy]
    end
  end

end
