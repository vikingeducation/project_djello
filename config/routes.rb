Rails.application.routes.draw do
  
  devise_for :users
  root 'angular#index'

  scope 'api' do
    resources :boards, :only => [:index, :show, :create, :update, :destroy]
    resources :lists, :only => [:create, :update, :destroy]
    resources :cards, :only => [:create, :update, :destroy]
  end

end