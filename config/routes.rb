Rails.application.routes.draw do
  
  devise_for :users
  root 'angular#index'

  scope 'api' do
    resources :board, :only => [:show, :create]
  end

end