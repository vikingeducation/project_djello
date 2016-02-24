Rails.application.routes.draw do
  
  devise_for :users
  root 'angular#index'

  scope 'api' do
    resources :boards, :only => [:index, :show, :create, :update, :destroy]
    resources :lists, :only => [:create, :update, :destroy]
    resources :cards, :only => [:show, :create, :update, :destroy]
    resources :card_members, :only => [:create, :destroy]
    resources :users, :only => [:index]
  end

end