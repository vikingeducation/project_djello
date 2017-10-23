Rails.application.routes.draw do
  defaults format: :json do
    post 'login' => 'user_token#create'
    resources :users, only: [:index]
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
