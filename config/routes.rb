Rails.application.routes.draw do
  defaults format: :json do
    root 'user_token#create'
    post 'login' => 'user_token#create'
    get 'main' => 'main#index'
    resources :users, only: [:index]
    resources :boards, only: [:index, :update, :destroy, :show, :create] do
      resources :lists, only: [:create]
    end
    resources :lists, only: [:update, :destroy]

  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
